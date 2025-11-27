"use client"
import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl mt-10 font-bold mb-6 border-b pb-2">Terms & Conditions</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        By using RideZone, you agree to follow our rules and guidelines. Please read carefully.
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Users must provide accurate information when registering.</li>
        <li>All content posted must comply with local laws and RideZone policies.</li>
        <li>RideZone reserves the right to suspend or terminate accounts violating the rules.</li>
        <li>Products added must follow the quality standards outlined in our guidelines.</li>
      </ol>
    </section>
  );
};

export default TermsAndConditions;
