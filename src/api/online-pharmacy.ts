import { Session } from "next-auth";
import { createClientAxios } from "./axios-client";
import { handleAxiosError } from "./index";
import { productCategoryParams } from "@/hooks/useFetch";
import { SingleProduct } from "@/app/dashboard/pharmarcy/product/[id]/page";
import { OrderList } from "@/app/dashboard/pharmarcy/account/orders";
import { SavedProducts } from "@/app/dashboard/pharmarcy/account/saved-items/page";
import { AddressParams } from "@/app/dashboard/pharmarcy/account/addresses/page";
import { Order } from "@/lib/features/cartSlice";
import { ReturnOrder } from "@/app/dashboard/pharmarcy/modals/refund-process";

export interface ReviewProductParams {
  userid: string;
  productid: string;
  rating: number;
  review: string;
}
export interface SavedProdParams {
  data: SavedProducts[];
}
export interface SingProductParams {
  data: SingleProduct;
}
export interface AllProductsParams {
  category: string;
  subcategory: string;
  innercategory: string;
  brand: string;
  color: string;
  price: number;
  rating: number;
}
// export interface CreateOrderParams {
//   userid: string;
//   patientName: string;
//   patientAdresss: string;
//   patientPhoneNumber: string;
//   drugName: string;
//   drugId: string;
//   price: number;
//   qty: number;
//   session: Session;
// }
export interface CreateAddressParams {
  userid: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  postalcode: string;
  state: string;
  city: string;
  country: string;
  latitiude: string;
  longitude: string;
  addressid?: string;
}
interface DefaultAdressParams {
  data: AddressParams[];
}
export interface SubCategoryParams {
  data: [
    {
      category: string;
      subcategory: string;
      _id: string;
    },
  ];
}
export interface SubSubCategoryParams {
  data: [
    {
      category: string;
      subcategory: string;
      innercategory: string;
      _id: string;
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
    getAllAddresses: onlinePharmacyUrl + "/retrieve/all/address",
    getSingleAddresses: onlinePharmacyUrl + "/retrieve/single/address",
    setDefaultAddress: onlinePharmacyUrl + "/set/default/address",
    deleteAddress: onlinePharmacyUrl + "/default/address",
  },
  orders: {
    getAllOrders: onlinePharmacyUrl + "/retrieve/all/order",
    createOrder: onlinePharmacyUrl + "/create/order",
    getSingleOrder: onlinePharmacyUrl + "/retrieve/single/order",
    useCoupon: "/user/user/ordercoupon",
    returnOrder: onlinePharmacyUrl + "/create/return/order",
  },
  savedProduct: {
    getSavedProducts: onlinePharmacyUrl + "/retrieve/save/product",
    save: onlinePharmacyUrl + "/save/product",
  },
  payment: {
    makePayment: onlinePharmacyUrl + "/make/payment",
    pendingPayment: onlinePharmacyUrl + "/pay/pescribed/order",
  },
  reviewProduct: onlinePharmacyUrl + "/create/review",
};

// post request functions  to retrive data from the server
const onlinePharmacyApi = {
  getAddress: async (
    session: Session,
    userid: string,
  ): Promise<DefaultAdressParams> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.address.getAddress,
        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error getting address");
      throw new Error(errorMessage);
    }
  },
  getallAddress: async (
    session: Session,
    userid: string,
  ): Promise<DefaultAdressParams> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.address.getAllAddresses,
        {
          userid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error getting address");
      throw new Error(errorMessage);
    }
  },
  createAddress: async (session: Session, userDetails: CreateAddressParams) => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.address.createAddress,
        {
          ...userDetails,
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
  updateAddress: async (session: Session, userDetails: CreateAddressParams) => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.address.updateAddress,
        {
          ...userDetails,
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
  saveProduct: async (session: Session, userid: string, productid: string) => {
    console.log(session, userid, productid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.savedProduct.save,
        {
          userid,
          productid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error creating saving product",
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
    // console.log(category);
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
  ): Promise<OrderList> => {
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
    params: Order,
  ): Promise<SubCategoryParams> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.createOrder,

        {
          ...params,
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
    orderid: string,
  ) => {
    console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.getSingleOrder,
        {
          userid,
          orderid,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  returnOrder: async (session: Session, order: ReturnOrder) => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.orders.returnOrder,
        {
          ...order,
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
    category: string,
    subcategory: string,
  ): Promise<SubSubCategoryParams> => {
    const axios = createClientAxios({ session: session });
    console.log(category, subcategory, "coming from online pharmacy api");
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveInnerCategory,

        {
          category,
          subcategory,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getAllProducts: async (session: Session, params: AllProductsParams) => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveAllProduct,

        {
          ...params,
        },
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching Products");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
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
  getSavedProduct: async (session: Session, userid: string) => {
    // console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.savedProduct.getSavedProducts,

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
  makePayment: async (
    session: Session,
    userid: string,
    email: string,
    amount: number,
  ) => {
    console.log(userid);
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.payment.makePayment,

        {
          userid,
          email,
          amount,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  reviewProduct: async (session: Session, params: ReviewProductParams) => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.reviewProduct,

        {
          ...params,
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
