"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Función para manejar el scroll suave con efectos especiales
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      const href = target.getAttribute("href")

      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetElement = document.querySelector(href)

        if (targetElement) {
          // Agregar efecto de "flash" al elemento objetivo
          const addFlashEffect = () => {
            targetElement.classList.add("animate-pulse")
            setTimeout(() => {
              targetElement.classList.remove("animate-pulse")
            }, 1000)
          }

          // Scroll suave con callback
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })

          // Agregar efecto después del scroll
          setTimeout(addFlashEffect, 800)
        }
      }
    }

    // Agregar event listeners a todos los enlaces internos
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  return null
}
