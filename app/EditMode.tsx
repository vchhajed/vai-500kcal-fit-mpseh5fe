'use client'

import { useEffect } from 'react'

/**
 * VAI Edit Mode — injected by the dashboard when loaded in an iframe with ?vai_edit=1
 * Adds hover highlights and click detection, sends postMessage events to the parent dashboard.
 *
 * Element types detected:
 *   text    — headings and paragraphs
 *   image   — <img> elements
 *   button  — <a> and <button> elements
 *   nav     — navbar area
 *   section — whole page sections (<section>, divs with id)
 */
export default function EditMode() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.location.search.includes('vai_edit=1')) return
    if (window.parent === window) return // not in iframe

    /* Inject hover styles */
    const style = document.createElement('style')
    style.id = 'vai-edit-mode'
    style.textContent = `
      body * { cursor: crosshair !important; user-select: none !important; }

      /* Text */
      h1:hover, h2:hover, h3:hover, h4:hover, p:hover, span:hover, li:hover {
        outline: 2px solid rgba(197,106,57,0.75) !important;
        outline-offset: 2px;
        background: rgba(197,106,57,0.06) !important;
      }
      /* Images */
      img:hover {
        outline: 3px solid rgba(59,130,246,0.8) !important;
        outline-offset: 2px;
      }
      /* Buttons & links */
      a:hover, button:hover {
        outline: 2px solid rgba(16,185,129,0.8) !important;
        outline-offset: 3px;
      }
      /* Nav */
      nav:hover, header:hover {
        outline: 2px solid rgba(139,92,246,0.8) !important;
        outline-offset: 0;
      }
      /* Sections */
      section:hover, [id]:not(html):not(body):hover {
        outline: 1px dashed rgba(255,255,255,0.15) !important;
        outline-offset: -2px;
      }

      /* Tooltip label */
      .vai-tooltip {
        position: fixed;
        z-index: 99999;
        background: rgba(10,10,12,0.92);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 7px;
        padding: 5px 10px;
        font-size: 11px;
        font-weight: 700;
        color: #F0EDE8;
        pointer-events: none;
        letter-spacing: 0.3px;
        font-family: system-ui, sans-serif;
        display: none;
      }
    `
    document.head.appendChild(style)

    /* Tooltip element */
    const tooltip = document.createElement('div')
    tooltip.className = 'vai-tooltip'
    document.body.appendChild(tooltip)

    function getElementInfo(el: HTMLElement): { type: string; label: string; color: string; content: string } {
      const tag = el.tagName

      if (tag === 'IMG' || el.closest('img'))
        return { type: 'image',   label: '🖼 Click to change image',   color: '#3B82F6', content: (el as HTMLImageElement).src || (el.closest('img') as HTMLImageElement)?.src || '' }

      if (tag === 'NAV' || el.closest('nav') || tag === 'HEADER' || el.closest('header'))
        return { type: 'nav',     label: '🧭 Navbar — add page or edit links', color: '#8B5CF6', content: '' }

      if ((tag === 'A' && !(el.closest('nav') || el.closest('header'))) || (tag === 'BUTTON' && !(el.closest('nav') || el.closest('header'))))
        return { type: 'button',  label: '🔘 Edit button text & link',  color: '#10B981', content: el.textContent?.trim() || '' }

      if (el.closest('a') && !(el.closest('nav') || el.closest('header')))
        return { type: 'button',  label: '🔘 Edit button text & link',  color: '#10B981', content: el.closest('a')!.textContent?.trim() || '' }

      if (['H1','H2','H3','H4','H5'].includes(tag))
        return { type: 'text',    label: '✏ Edit heading',              color: '#C56A39', content: el.textContent?.trim() || '' }

      if (tag === 'P' || tag === 'SPAN' || tag === 'LI')
        return { type: 'text',    label: '✏ Edit text',                 color: '#C56A39', content: el.textContent?.trim() || '' }

      const section = el.closest('section') || el.closest('[id]')
      if (section)
        return { type: 'section', label: `📐 ${(section as HTMLElement).id || 'Section'} — edit content`, color: '#F59E0B', content: (section as HTMLElement).id || '' }

      return { type: 'section',   label: '📐 Click to edit this section', color: '#F59E0B', content: '' }
    }

    /* Hover — show tooltip */
    function onMouseMove(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (!el || el === document.body || el === document.documentElement) { tooltip.style.display = 'none'; return }

      const info = getElementInfo(el)
      tooltip.textContent = info.label
      tooltip.style.display = 'block'
      tooltip.style.borderColor = info.color + '66'
      tooltip.style.color = info.color

      const x = Math.min(e.clientX + 12, window.innerWidth - 200)
      const y = Math.max(e.clientY - 36, 8)
      tooltip.style.left = x + 'px'
      tooltip.style.top  = y + 'px'
    }

    /* Click — send postMessage to parent */
    function onClick(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()

      const el   = e.target as HTMLElement
      const info = getElementInfo(el)
      const rect = el.getBoundingClientRect()

      window.parent.postMessage({
        type:        'VAI_ELEMENT_CLICK',
        elementType: info.type,
        label:       info.label,
        content:     info.content,
        tagName:     el.tagName,
        sectionId:   el.closest('[id]')?.id || el.closest('section')?.id || '',
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        scrollY:     window.scrollY,
      }, '*')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('click',     onClick, true)

    /* Signal ready */
    window.parent.postMessage({ type: 'VAI_EDIT_READY' }, '*')

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('click',     onClick, true)
      style.remove()
      tooltip.remove()
    }
  }, [])

  return null
}
