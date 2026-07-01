"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Images, ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
}

interface GalleryButtonProps {
  isDark: boolean;
  images: GalleryImage[];
  label?: string;
}

export function GalleryButton({
  isDark,
  images,
  label = "View gallery",
}: GalleryButtonProps) {
  const [open, setOpen] = useState(false);

  const bg = isDark ? "rgba(94,80,232,0.15)" : "rgba(94,80,232,0.08)";
  const border = isDark ? "rgba(94,80,232,0.30)" : "rgba(94,80,232,0.22)";
  const color = isDark ? "#B8AFFF" : "#5E50E8";
  const hoverBg = isDark ? "rgba(94,80,232,0.25)" : "rgba(94,80,232,0.14)";

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 28px",
            borderRadius: 999,
            background: bg,
            border: `1px solid ${border}`,
            color,
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            transition: "background 0.2s, border-color 0.2s, transform 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = hoverBg;
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = bg;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Images size={18} />
          <span>{label}</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              opacity: 0.7,
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(94,80,232,0.10)",
              padding: "2px 8px",
              borderRadius: 999,
            }}
          >
            {images.length}
          </span>
        </button>
      </div>

      <GalleryLightbox
        images={images}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function GalleryLightbox({
  images,
  open,
  onClose,
}: {
  images: GalleryImage[];
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  // Reset index when opening
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  // Keyboard nav + body scroll lock
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  if (!portalTarget) return null;

  const current = images[index];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="gallery-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close gallery"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.10)";
            }}
          >
            <X size={20} />
          </button>

          {/* Image + info panel */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 32,
              maxWidth: "92vw",
              maxHeight: "88vh",
            }}
          >
            <img
              src={current.src}
              alt={current.alt}
              draggable={false}
              style={{
                maxWidth: current.caption || current.description ? "72vw" : "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                display: "block",
                flexShrink: 1,
                minWidth: 0,
              }}
            />
            {(current.caption || current.description) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  maxWidth: 200,
                  flexShrink: 0,
                }}
              >
                {current.caption && (
                  <h3
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                      color: "rgba(255,255,255,0.90)",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {current.caption}
                  </h3>
                )}
                {current.description && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.45)",
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {current.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.20)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.20)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              }}
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: 28,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.03em",
              }}
            >
              {index + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget
  );
}
