"use client"
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "You can sign up using Google or email/password via the registration page."
  },
  {
    question: "How do I add a product?",
    answer: "After logging in, go to the “Add Product” page and fill in the required details."
  },
  {
    question: "How do I manage my products?",
    answer: "Visit the “Manage Products” page to view, edit, or delete your products."
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 border-b mt-10 pb-2">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 flex justify-between items-center font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {faq.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
