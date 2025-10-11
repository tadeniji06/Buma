"use client";
import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { GET_VENDORS_WITH_BILLBOARDS } from "@/lib/queries";
import Image from "next/image";
import { Icon } from "@iconify/react";
import BillboardModal from "../BillboardModal";
import { Vendor, Billboard } from "@/types/billboard";

const Body = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await sanity.fetch(GET_VENDORS_WITH_BILLBOARDS);
      setVendors(data);
      setSelectedVendor(data[0]);
    };
    fetchData();
  }, []);

  const toggleRegion = (regionName: string) => {
    setExpandedRegions(prev => ({
      ...prev,
      [regionName]: !prev[regionName],
    }));
  };

  if (!vendors.length)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading billboards...</p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
      {/* Sidebar (desktop only) */}
      <aside className="hidden md:block w-64 border-r border-gray-200 p-6 bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon icon="mi:filter" className="text-gray-600 text-lg" />
          <p className="font-semibold text-gray-800">Vendors</p>
        </div>

        <ul className="space-y-4">
          {vendors.map((vendor, i) => (
            <li
              key={i}
              onClick={() => setSelectedVendor(vendor)}
              className={`flex justify-between items-center cursor-pointer text-sm ${
                selectedVendor?._id === vendor._id
                  ? "text-primary-purple font-semibold"
                  : "text-gray-700 hover:text-primary-purple"
              }`}
            >
              <span>{vendor.name}</span>
              <span className="text-gray-500">
                {vendor.regions?.reduce(
                  (sum, region) => sum + (region.billboards?.length || 0),
                  0
                )}{" "}
                boards
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile vendor dropdown */}
      <div className="md:hidden sticky top-0 bg-white z-20 border-b px-4 py-3 flex justify-between items-center shadow-sm">
        <label htmlFor="vendorSelect" className="font-medium text-gray-800 text-sm">
          Select Vendor:
        </label>
        <select
          id="vendorSelect"
          className="border rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-purple"
          value={selectedVendor?._id || ""}
          onChange={e => {
            const vendor = vendors.find(v => v._id === e.target.value);
            if (vendor) setSelectedVendor(vendor);
          }}
        >
          {vendors.map(vendor => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedVendor?.name} —{" "}
            {selectedVendor?.regions?.reduce(
              (sum, region) => sum + (region.billboards?.length || 0),
              0
            )}{" "}
            billboards
          </h2>
        </div>

        {selectedVendor?.regions?.map((region, i) => {
          const isExpanded = expandedRegions[region.name];
          const displayedBillboards = isExpanded
            ? region.billboards
            : region.billboards?.slice(0, 3);

          return (
            <div key={i} className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-gray-700">{region.name}</h3>
                {region.billboards?.length > 3 && (
                  <button
                    onClick={() => toggleRegion(region.name)}
                    className="text-sm text-primary-purple font-medium hover:underline"
                  >
                    {isExpanded
                      ? "See less"
                      : `See all (${region.billboards.length})`}
                  </button>
                )}
              </div>

              {/* Billboards grid */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-300 ease-in-out`}
              >
                {displayedBillboards?.map((b, j) => (
                  <div
                    key={j}
                    onClick={() => setSelectedBillboard(b)}
                    className="cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="relative w-full h-44 sm:h-52">
                      <Image
                        src={b.image}
                        alt={b.area || "Billboard"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {b.area || "Unknown Area"}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-1">
                        {b.size || "Unknown Size"}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          b.status === "available"
                            ? "text-green-600"
                            : b.status === "booked"
                            ? "text-red-500"
                            : "text-yellow-600"
                        }`}
                      >
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </p>
                      {b.description && (
                        <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                          {b.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* Billboard Details Modal */}
      <BillboardModal
        billboard={selectedBillboard}
        onClose={() => setSelectedBillboard(null)}
      />
    </div>
  );
};

export default Body;
