// import { useState, useEffect } from "react";
// import { Navigation } from "@/components/Layout/Navigation";
// import { Button } from "@/components/ui/button";
// import { Calendar, Download, Filter, X } from "lucide-react";
// import { useToastNotification } from "@/hooks/useToastNotification";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// interface HistoryRecord {
//   id: number;
//   timestamp: string;
//   waterLevel: number;
//   petrolPurity: number;
//   status: string;
// }

// export const History = () => {
//   const { showToast, ToastContainer } = useToastNotification();
//   const [records, setRecords] = useState<HistoryRecord[]>([]);
//   const [filteredRecords, setFilteredRecords] = useState<HistoryRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     status: "ALL",
//   });

//   const recordsPerPage = 100;

//   useEffect(() => {
//     fetchHistoricalData();
//   }, []);

//   const fetchHistoricalData = async () => {
//     try {
//       const response = await fetch(
//         "https://api.thingspeak.com/channels/3024727/feeds.json?results=10000"
//       );
//       const data = await response.json();

//       if (data.feeds) {
//         const formattedRecords: HistoryRecord[] = data.feeds.map((feed: any, index: number) => {
//           const waterLevel = parseFloat(feed.field1) || 0;
//           const petrolPurity = 100 - waterLevel;
//           const status = waterLevel > 16 ? "WARNING" : "OK";

//           return {
//             id: index + 1,
//             timestamp: feed.created_at,
//             waterLevel,
//             petrolPurity,
//             status,
//           };
//         });

//         setRecords(formattedRecords.reverse());
//         setFilteredRecords(formattedRecords.reverse());
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching historical data:", error);
//       showToast("Failed to load historical data", "error");
//       setLoading(false);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...records];

//     if (filters.startDate) {
//       filtered = filtered.filter(
//         (record) => new Date(record.timestamp) >= new Date(filters.startDate)
//       );
//     }

//     if (filters.endDate) {
//       filtered = filtered.filter(
//         (record) => new Date(record.timestamp) <= new Date(filters.endDate)
//       );
//     }

//     if (filters.status !== "ALL") {
//       filtered = filtered.filter((record) => record.status === filters.status);
//     }

//     setFilteredRecords(filtered);
//     setCurrentPage(1);
//     showToast(`Filtered to ${filtered.length} records`, "success");
//   };

//   const clearFilters = () => {
//     setFilters({ startDate: "", endDate: "", status: "ALL" });
//     setFilteredRecords(records);
//     setCurrentPage(1);
//     showToast("Filters cleared", "info");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     doc.setFontSize(18);
//     doc.text("Tank Monitor - Historical Data", 14, 20);
    
//     doc.setFontSize(10);
//     doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
//     doc.text(`Total Records: ${filteredRecords.length}`, 14, 34);

//     const tableData = currentPageRecords.map((record) => [
//       new Date(record.timestamp).toLocaleString(),
//       `${record.waterLevel.toFixed(2)}%`,
//       `${record.petrolPurity.toFixed(2)}%`,
//       record.status,
//     ]);

//     autoTable(doc, {
//       startY: 40,
//       head: [["Timestamp", "Water Level", "Petrol Purity", "Status"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: { fillColor: [0, 163, 137] },
//       alternateRowStyles: { fillColor: [245, 245, 245] },
//     });

//     doc.save(`tank-history-${new Date().toISOString().split("T")[0]}.pdf`);
//     showToast("PDF exported successfully!", "success");
//   };

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentPageRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <ToastContainer />

//       <div className="container mx-auto px-6 py-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-foreground mb-2">Historical Data</h1>
//           <p className="text-muted-foreground">View and export tank monitoring records</p>
//         </div>

//         {/* Filters */}
//         <div className="bg-card rounded-2xl shadow-xl p-6 border border-border mb-6">
//           <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
//             <Filter className="h-5 w-5 text-primary" />
//             Filter Data
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             <div className="floating-label-input">
//               <input
//                 type="date"
//                 id="startDate"
//                 value={filters.startDate}
//                 onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//                 className="px-4 py-3 border-2 border-input rounded-lg w-full"
//               />
//               <label htmlFor="startDate" className="-top-2 left-2 text-xs bg-card px-2">
//                 From Date
//               </label>
//             </div>

//             <div className="floating-label-input">
//               <input
//                 type="date"
//                 id="endDate"
//                 value={filters.endDate}
//                 onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//                 className="px-4 py-3 border-2 border-input rounded-lg w-full"
//               />
//               <label htmlFor="endDate" className="-top-2 left-2 text-xs bg-card px-2">
//                 To Date
//               </label>
//             </div>

//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="px-4 py-3 border-2 border-input rounded-lg bg-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//             >
//               <option value="ALL">All Status</option>
//               <option value="OK">OK</option>
//               <option value="WARNING">WARNING</option>
//             </select>

//             <div className="flex gap-2">
//               <Button onClick={applyFilters} className="flex-1 gap-2">
//                 <Filter className="h-4 w-4" />
//                 Apply
//               </Button>
//               <Button onClick={clearFilters} variant="outline" className="gap-2">
//                 <X className="h-4 w-4" />
//                 Clear
//               </Button>
//             </div>
//           </div>

//           <Button onClick={exportToPDF} variant="default" className="gap-2 bg-accent hover:bg-accent/90">
//             <Download className="h-4 w-4" />
//             Export to PDF
//           </Button>
//         </div>

//         {/* Data Table */}
//         <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-primary text-primary-foreground sticky top-0">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold">Timestamp</th>
//                   <th className="px-6 py-4 text-right font-semibold">Water Level</th>
//                   <th className="px-6 py-4 text-right font-semibold">Petrol Purity</th>
//                   <th className="px-6 py-4 text-center font-semibold">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-12 text-center">
//                       <div className="space-y-3">
//                         {[...Array(5)].map((_, i) => (
//                           <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 ) : currentPageRecords.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
//                       No records found
//                     </td>
//                   </tr>
//                 ) : (
//                   currentPageRecords.map((record, index) => (
//                     <tr
//                       key={record.id}
//                       className={index % 2 === 0 ? "bg-background" : "bg-secondary/30"}
//                     >
//                       <td className="px-6 py-4 text-sm font-mono">
//                         {new Date(record.timestamp).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-right font-semibold">
//                         {record.waterLevel.toFixed(2)}%
//                       </td>
//                       <td className="px-6 py-4 text-sm text-right font-semibold text-success">
//                         {record.petrolPurity.toFixed(2)}%
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span
//                           className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
//                             record.status === "OK"
//                               ? "bg-success/20 text-success"
//                               : "bg-warning/20 text-warning"
//                           }`}
//                         >
//                           {record.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && filteredRecords.length > 0 && (
//             <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
//               <p className="text-sm text-muted-foreground">
//                 Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
//                 {filteredRecords.length} records
//               </p>
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </Button>
//                 <div className="flex items-center gap-2 px-4">
//                   <span className="text-sm font-semibold">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;





import { useState, useEffect } from "react";
import { Navigation } from "@/components/Layout/Navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, X } from "lucide-react";
import { useToastNotification } from "@/hooks/useToastNotification";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface HistoryRecord {
  id: number;
  timestamp: string;
  waterLevel: number;
  petrolLevel: number;
  pumpStatus: string;
  emergencyButtonStatus: string;
  status: string;
}

export const History = () => {
  const { showToast, ToastContainer } = useToastNotification();
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "ALL",
  });

  const recordsPerPage = 100;

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        "https://api.thingspeak.com/channels/3024727/feeds.json?results=10000"
      );
      const data = await response.json();

      if (data.feeds) {
        const formattedRecords: HistoryRecord[] = data.feeds.map((feed: any, index: number) => {
          const waterLevel = parseFloat(feed.field1) || 0;
          const petrolLevel = 100 - waterLevel;
          const pumpStatus = parseInt(feed.field2) === 1 ? "ON" : "OFF";
          const emergencyButtonStatus = parseInt(feed.field3) === 1 ? "ON" : "OFF";
          // const status = pumpStatus === "ON" && emergencyButtonStatus === "ON" ? "OK" : "WARNING";
          const status = waterLevel > 16 ? "WARNING" : "OK"; 

          return {
            id: index + 1,
            timestamp: feed.created_at,
            waterLevel,
            petrolLevel,
            pumpStatus,
            emergencyButtonStatus,
            status,
          };
        });

        // Reverse the records so latest is first
        const latestFirstRecords = formattedRecords.reverse();
        setRecords(latestFirstRecords);
        setFilteredRecords(latestFirstRecords);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      showToast("Failed to load historical data", "error");
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...records];

    if (filters.startDate) {
      filtered = filtered.filter(
        (record) => new Date(record.timestamp) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        (record) => new Date(record.timestamp) <= new Date(filters.endDate)
      );
    }

    if (filters.status !== "ALL") {
      filtered = filtered.filter((record) => record.status === filters.status);
    }

    setFilteredRecords(filtered);
    setCurrentPage(1);
    showToast(`Filtered to ${filtered.length} records`, "success");
  };

  const clearFilters = () => {
    setFilters({ startDate: "", endDate: "", status: "ALL" });
    setFilteredRecords(records);
    setCurrentPage(1);
    showToast("Filters cleared", "info");
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentPageRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Tank Monitor - Historical Data", 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Total Records: ${filteredRecords.length}`, 14, 34);

    const tableData = filteredRecords.map((record) => [
      new Date(record.timestamp).toLocaleString(),
      `${record.waterLevel.toFixed(2)}%`,
      `${record.petrolLevel.toFixed(2)}%`,
      record.pumpStatus,
      record.emergencyButtonStatus,
      record.status,
    ]);


    autoTable(doc, {
      startY: 40,
      head: [["Timestamp", "Water Level", "Petrol Level", "Pump", "Emergency Button", "Status"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 163, 137] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`tank-history-${new Date().toISOString().split("T")[0]}.pdf`);
    showToast("PDF exported successfully!", "success");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ToastContainer />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Historical Data</h1>
          <p className="text-muted-foreground">View and export tank monitoring records</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-xl p-6 border border-border mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" /> Filter Data
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="floating-label-input">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="px-4 py-3 border-2 border-input rounded-lg w-full"
              />
              <label className="-top-2 left-2 text-xs bg-card px-2">From Date</label>
            </div>

            <div className="floating-label-input">
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="px-4 py-3 border-2 border-input rounded-lg w-full"
              />
              <label className="-top-2 left-2 text-xs bg-card px-2">To Date</label>
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-3 border-2 border-input rounded-lg bg-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="OK">OK</option>
              <option value="WARNING">WARNING</option>
            </select>

            <div className="flex gap-2">
              <Button onClick={applyFilters} className="flex-1 gap-2">
                <Filter className="h-4 w-4" /> Apply
              </Button>
              <Button onClick={clearFilters} variant="outline" className="gap-2">
                <X className="h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          <Button onClick={exportToPDF} variant="default" className="gap-2 bg-accent hover:bg-accent/90">
            <Download className="h-4 w-4" /> Export to PDF
          </Button>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Timestamp</th>
                  <th className="px-6 py-4 text-right font-semibold">Water Level</th>
                  <th className="px-6 py-4 text-right font-semibold">Petrol Level</th>
                  <th className="px-6 py-4 text-center font-semibold">Pump State</th>
                  <th className="px-6 py-4 text-center font-semibold">Emergency Button</th>
                  <th className="px-6 py-4 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ) : currentPageRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No records found
                    </td>
                  </tr>
                ) : (
                  currentPageRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className={index % 2 === 0 ? "bg-background" : "bg-secondary/30"}
                    >
                      <td className="px-6 py-4 text-sm font-mono">{new Date(record.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold">{record.waterLevel.toFixed(2)}%</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-success">{record.petrolLevel.toFixed(2)}%</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${record.pumpStatus === "ON" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                          }`}>{record.pumpStatus}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${record.emergencyButtonStatus === "ON" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                          }`}>{record.emergencyButtonStatus}</span>


                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${record.status === "OK" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                          }`}>{record.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filteredRecords.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
              <p className="text-sm text-muted-foreground">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                <span className="text-sm font-semibold px-4">Page {currentPage} of {totalPages}</span>
                <Button variant="outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
