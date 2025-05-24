import ReportTable from "./_components/report-table";

const ManageReport = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Danh sách phản hồi</h2>
        <p className="text-sm text-gray-500 mt-1">
          Xem danh sách các phản hồi từ người dùng
        </p>
      </div>
      <ReportTable />
    </div>
  );
};

export default ManageReport;
