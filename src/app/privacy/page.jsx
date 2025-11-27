"use client"
import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 border-b mt-10 pb-2">Privacy Policy</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        We respect your privacy and are committed to protecting your personal information.
        This page explains how we collect, use, and safeguard your data.
      </p>
      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
        <li>Information Collection: We collect only the necessary data to provide services.</li>
        <li>Data Usage: Your data is used to improve your experience on RideZone.</li>
        <li>Third-Party Sharing: We never sell your data. Only trusted partners may have access.</li>
        <li>Security: We implement industry-standard security measures to protect your data.</li>
      </ul>
    </section>
  );
};

export default PrivacyPolicy;
