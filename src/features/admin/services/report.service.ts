import reportApi from "../api/report";

const reportServices = {
  getAllReports: async (limit: number, index: number) => {
    const response = await reportApi.getAllReports(limit, index);
    return response;
  },
};

export default reportServices;
