import { Session } from "next-auth";
import { createClientAxios } from "./axios-client";
import { handleAxiosError } from "./index";
import { productCategoryParams } from "@/hooks/useFetch";
import { SingleProduct } from "@/app/dashboard/pharmarcy/product/[id]/page";

export interface SingProductParams {
  data: SingleProduct;
}
export interface CreateDrugOrderRequestParams {
  userId: string;
  patientName: string;
  patientAdresss: string;
  patientPhoneNumber: string;
  drugName: string;
  drugId: string;
  price: number;
  qty: number;
  session: Session;
}
export interface CreateAddressParams {
  userid: string;
  phone: number;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  postalcode: number;
  state: string;
  city: string;
  latitude?: string;
  longitude?: string;
  session: Session;
}
export interface SubCategoryParams {
  data: [
    {
      category: string;
      subcategory: string;
    },
  ];
}
const onlinePharmacyUrl = "/user/pharmacy";
// endpoints to receive data from the server
const apiEndpoints = {
  productCategory: {
    retrieveBestProduct: onlinePharmacyUrl + "/best/selling/product",
    retrieveNewProduct: onlinePharmacyUrl + "/new/product",
    retrieveSingleProduct: onlinePharmacyUrl + "/retrieve/single/product",
    retrieveAllProduct: onlinePharmacyUrl + "/retrieve/all/product",
    retrieveAllCategory: onlinePharmacyUrl + "/category",
    retrieveSubCategory: onlinePharmacyUrl + "/subcategory",
    retrieveInnerCategory: onlinePharmacyUrl + "/innercategory",
  },
  address: {
    createAddress: onlinePharmacyUrl + "/create/address",
    updateAddress: onlinePharmacyUrl + "/update/address",
    getAddress: onlinePharmacyUrl + "/retrieve/default/address",
    getAllAddresses: onlinePharmacyUrl + "retrieve/all/address",
    getSingleAddresses: onlinePharmacyUrl + "retrieve/single/address",
    setDefaultAddress: onlinePharmacyUrl + "set/default/address",
    deleteAddress: onlinePharmacyUrl + "default/address",
  },
  orders: {
    getAllOrders: onlinePharmacyUrl + "retrieve/all/order",
    createOrder: onlinePharmacyUrl + "retrieve/create/order",
    getSingleOrder: onlinePharmacyUrl + "retrieve/single/order",
    useCoupon: "/user/user/ordercoupon",
  },
};

// post request functions  to retrive data from the server
const onlinePharmacyApi = {
  createAddress: async (params: CreateAddressParams) => {
    const { session, ...otherParams } = params;
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.address.createAddress,
        {
          ...otherParams,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error creating new drug order",
      );
      throw new Error(errorMessage);
    }
  },

  getAllCategories: async (
    session: Session,
  ): Promise<productCategoryParams> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveAllCategory,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },

  getSubCategories: async (
    session: Session,
    category: string,
  ): Promise<SubCategoryParams> => {
    console.log(category);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveSubCategory,

        {
          category,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getAllOrders: async (
    session: Session,
    userid: string,
  ): Promise<SubCategoryParams> => {
    console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.getAllOrders,

        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  createOrder: async (
    session: Session,
    userid: string,
  ): Promise<SubCategoryParams> => {
    console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.createOrder,

        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getSingleOrders: async (
    session: Session,
    userid: string,
  ): Promise<SubCategoryParams> => {
    console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.getSingleOrder,

        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  useCoupon: async (
    session: Session,
    userid: string,
  ): Promise<SubCategoryParams> => {
    console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.useCoupon,

        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getInnerCategories: async (
    session: Session,
  ): Promise<productCategoryParams> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveInnerCategory,

        {
          category: "66df402da60f3b195520d0f3",
          subcategory: "66df6407a60f3b195520d136",
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  // getAllProducts: async (
  //   session: Session,
  //   params: object,
  // ): Promise<string[]> => {
  //   const axios = createClientAxios({ session: session });
  //   const data = JSON.stringify(params);
  //   try {
  //     const response = await axios.post(
  //       process.env.NEXT_PUBLIC_API_URL +
  //         apiEndpoints.productCategory.retrieveAllProduct,

  //       data,
  //     );
  //     return response.data;
  //   } catch (error) {
  //     const errorMessage = handleAxiosError(error, "Error fetching Products");
  //     console.log(errorMessage);
  //     throw new Error(errorMessage);
  //   }
  // },
  getNewProducts: async (session: Session): Promise<productCategoryParams> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveNewProduct,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching Products");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getBestProducts: async (session: Session): Promise<productCategoryParams> => {
    const axios = createClientAxios({ session: session });

    try {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveBestProduct,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching Products");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getSingleProduct: async (
    session: Session,
    productid: string | string[],
  ): Promise<SingProductParams> => {
    console.log(productid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveSingleProduct,

        {
          productid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
};

export default onlinePharmacyApi;
