"use client";

import React, { useState } from "react";
import { FAQItem } from "@/data/site-data";
import { ChevronDown } from "lucide-react";

interface FaqAccordionProps {
  items: FAQItem[];
  allowMultiple?: boolean;
}

export function FaqAccordion({ items, allowMultiple = false }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      if (openIndexes.includes(index)) {
        setOpenIndexes([]);
      } else {
        setOpenIndexes([index]);
      }
    }
  };

  return (
    <div className="w-full divide-y divide-taupe-border/50 border-y border-taupe-border/50">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={item.question} className="py-5 sm:py-6 group">
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded py-1"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-serif text-xl sm:text-2xl text-espresso font-normal group-hover:text-caramel transition-colors pr-6">
                {item.question}
              </span>
              <span
                className={`p-2 rounded-full border border-taupe-border/60 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180 bg-espresso text-porcelain border-espresso" : "text-espresso group-hover:border-espresso"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-base sm:text-lg text-espresso/75 leading-relaxed pr-8 sm:pr-12">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

