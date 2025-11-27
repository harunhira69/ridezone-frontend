"use client"
import React from "react";

const ShippingInfo = () => {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 mt-10 border-b pb-2">Shipping Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold mb-2">Processing Time</h3>
          <p>Orders are processed within 1-2 business days before shipping.</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold mb-2">Shipping Methods</h3>
          <p>We offer standard, express, and priority shipping options to suit your needs.</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold mb-2">Shipping Costs</h3>
          <p>Costs depend on the shipping method and destination. Calculated at checkout.</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <h3 className="font-semibold mb-2">Tracking</h3>
          <p>Once shipped, a tracking number will be provided for all orders.</p>
        </div>
      </div>
    </section>
  );
};

export default ShippingInfo;
