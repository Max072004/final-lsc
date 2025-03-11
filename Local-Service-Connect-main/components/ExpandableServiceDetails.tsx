"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Worker {
  _id:string;
  name: string;
  experience: string;
  rating: number;
  bio: string;
  availability: string[];
  specialties: string[];
}

interface ServiceDetails {
  title: string;
  src: string;
  description: string;
  workers: Worker[];
}

export function ExpandableServiceDetails({ service: propService }: { service: ServiceDetails }) {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [workerDetails, setWorkerDetails] = useState<Worker | null>(null);

  const fetchWorkerDetails = async (workerId: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/worker/getbyid/${workerId}');
      console.log(response);
      const data = await response.json();
      console.log(data);
      setWorkerDetails(data);
    } catch (error) {
      console.error("Error fetching worker details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg shadow-xl w-full mx-auto overflow-hidden flex flex-col">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-indigo-900">{propService.title}</h2>
        <p className="text-indigo-800 mb-6">{propService.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propService.workers?.map((worker, index) => (
            <motion.div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-indigo-900 text-lg">{worker.name}</h4>
              <Button onClick={() => {
                setSelectedWorker(worker);
                fetchWorkerDetails(worker._id); // Assuming worker.name is the ID
              }}>View Details</Button>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedWorker && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden p-8">
            <Button onClick={() => setSelectedWorker(null)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            {loading ? (
              <p className="text-indigo-600 text-center mt-4">Loading...</p>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-indigo-900">{workerDetails ? workerDetails.name : selectedWorker.name}</h2>
                <p className="text-indigo-800">Experience: {workerDetails ? workerDetails.experience : selectedWorker.experience}</p>
                <p className="text-indigo-800">Rating: {workerDetails ? workerDetails.rating : selectedWorker.rating}/5</p>
                <p className="text-indigo-800">Bio: {workerDetails ? workerDetails.bio : selectedWorker.bio}</p>
                {/* <p className="text-indigo-800">Availability: {workerDetails ? workerDetails.availability.join(", ") : selectedWorker.availability.join(", ")}</p> */}
                {/* <p className="text-indigo-800">Specialties: {workerDetails ? workerDetails.specialties.join(", ") : selectedWorker.specialties.join(", ")}</p> */}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}