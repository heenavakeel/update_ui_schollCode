import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// import Invoice from "../views/Invoice/newInvoice.js";
// import PDFGeneratorButton from "../views/Invoice/createPdf.js.js";

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout.js'));

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter.js'));
const About = lazy(() => import('../views/About.js'));
const Alerts = lazy(() => import('../views/ui/Alerts'));
const Badges = lazy(() => import('../views/ui/Badges'));
const Buttons = lazy(() => import('../views/ui/Buttons'));
const Cards = lazy(() => import('../views/ui/Cards'));
const Grid = lazy(() => import('../views/ui/Grid'));
const Tables = lazy(() => import('../views/ui/Tables'));
const Forms = lazy(() => import('../views/ui/Forms'));
const Breadcrumbs = lazy(() => import('../views/ui/Breadcrumbs'));

// const AddSale = lazy(()=> import("../views/Sales/AddSale.jsx"))
// const SaleDetail = lazy(()=> import("../views/Sales/SaleDetail.jsx"))
// const EditSale = lazy(()=> import("../views/Sales/EditSale.jsx"))

// const Category = lazy(()=> import("../views/Category/Category.jsx"))
// const AddCategory = lazy(()=> import("../views/Category/AddCategory.jsx"))
// const EditCategory = lazy(()=> import("../views/Category/EditCategory.jsx"))

// const AddItem = lazy(()=> import("../views/Item/AddItem.jsx"))
// const Item = lazy(()=> import("../views/Item/Item.jsx"))
// const EditItem = lazy(()=> import("../views/Item/EditItem.jsx"))

const Party = lazy(() => import('../views/Party/Party.jsx'));
const AddParty = lazy(() => import('../views/Party/AddParty.jsx'));
const EditParty = lazy(() => import('../views/Party/EditParty.jsx'));
const FeeHead = lazy(() => import('../views/FeeHeadMaster/FeeHead.jsx'));
const AddFeeHead = lazy(() => import('../views/FeeHeadMaster/AddFeeHead.jsx'));
const EditFeeHead = lazy(() =>
  import('../views/FeeHeadMaster/EditFeeHead.jsx')
);
const Circle = lazy(() => import('../views/CircleMaster/Circle.jsx'));
const AddCircleMaster = lazy(() =>
  import('../views/CircleMaster/AddCircleMaster.jsx')
);
const Admission = lazy(() => import('../views/AdmissionMaster/Admission.jsx'));
const AddAdmission = lazy(() =>
  import('../views/AdmissionMaster/AddAdmission.jsx')
);
const Slab = lazy(() => import('../views/SlabMaster/Slab.jsx'));
const AddSlabMaster = lazy(() =>
  import('../views/SlabMaster/AddSlabMaster.jsx')
);
const Fee_Group_Master_Details = lazy(() =>
  import('../views/Fee_Group_Master/Fee_Group_Master_Search_Screen.jsx')
);
const Fee_Group_Master_Add = lazy(() =>
  import('../views/Fee_Group_Master/Fee_Group_Master_Add_Edit_Screen.jsx')
);

const Class_Master_Details = lazy(() =>
  import('../views/Class_Master/Class_Master_Search_Screen.jsx')
);
const Class_Master_Add = lazy(() =>
  import('../views/Class_Master/Class_Master_Add_Edit_Screen.jsx')
);

const TcIssue_Master_Details = lazy(() =>
  import(
    '../views/TcIssueMasterDetail/Tc_Issue_Master_Detail_Search_Screen.jsx'
  )
);
const TcIssue_Master_Add = lazy(() =>
  import(
    '../views/TcIssueMasterDetail/Tc_Issue_Master_Detail_Add_Edit_Screen.jsx'
  )
);
const Fee_Reciept_Details = lazy(() =>
  import('../views/FeeReciept/Fee_Reciept_Master_Search.jsx')
);
const Fee_Reciept_Add = lazy(() =>
  import('../views/FeeReciept/Fee_Reciept_Master_Add_Edit_Screen.jsx')
);
const SubjectMaster_Details = lazy(() =>
  import('../views/SubjectMaster/Subject_Master_Search.jsx')
);
const SubjectMaster_Add = lazy(() =>
  import('../views/SubjectMaster/Subject_Master_Add_Edit_Screen.jsx')
);
const ClassDetailMaster_Details = lazy(() =>
  import('../views/ClassDetailMaster/Class_Detail_Master_Search.jsx')
);
const ClassDetailMaster_Add = lazy(() =>
  import('../views/ClassDetailMaster/Class_Detail_Master_Add_Edit_Screen.jsx')
);
const ResultMaster_Details = lazy(() =>
  import('../views/ResultMaster/Result_Master_New_Search.jsx')
);
const ResultDetailMaster_Add = lazy(() =>
  import('../views/ResultMaster/Result_Master_New_Add_Edit_Screen.jsx')
);
const AdmisionReport = lazy(() =>
  import('../views/Report/AdmisionReports.jsx')
);
const System_Record_Details = lazy(() =>
  import('../views/SystemRecord/SystemRecords.jsx')
);
const System_Record_Add = lazy(() =>
  import('../views/SystemRecord/AddSystemRecord.jsx')
);
const Multipurpose_Details = lazy(() =>
  import('../views/MultiPurposeMaster/Multi_Purpose_Type_Master_Search.jsx')
);
const Multipurpose_Add = lazy(() =>
  import(
    '../views/MultiPurposeMaster/Multi_Purpose_Type_Master_Add_Edit_Screen.jsx'
  )
);
/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/starter' /> },
      { path: '/starter', exact: true, element: <Starter /> },
      { path: '/about', exact: true, element: <About /> },
      { path: '/alerts', exact: true, element: <Alerts /> },
      { path: '/badges', exact: true, element: <Badges /> },
      { path: '/buttons', exact: true, element: <Buttons /> },
      { path: '/cards', exact: true, element: <Cards /> },
      { path: '/grid', exact: true, element: <Grid /> },
      { path: '/table', exact: true, element: <Tables /> },
      { path: '/forms', exact: true, element: <Forms /> },
      { path: '/breadcrumbs', exact: true, element: <Breadcrumbs /> },

      // { path: "/addsale", exact: true, element: <AddSale /> },
      // { path: "/saledetail", exact: true, element: <SaleDetail/> },
      // { path: "/editsale", exact: true, element: <EditSale/> },

      { path: '/addparty', exact: true, element: <AddParty /> },
      { path: '/party', exact: true, element: <Party /> },
      { path: '/editparty', exact: true, element: <EditParty /> },
      /// -----FeeHead---------------------
      { path: '/FeeHead', exact: true, element: <FeeHead /> },
      { path: '/addFeeHead', exact: true, element: <AddFeeHead /> },
      { path: '/editFeeHead', exact: true, element: <EditFeeHead /> },
      { path: '/Circle', exact: true, element: <Circle /> },
      { path: '/addCircleMaster', exact: true, element: <AddCircleMaster /> },
      { path: '/Admission', exact: true, element: <Admission /> },
      { path: '/AddAdmission', exact: true, element: <AddAdmission /> },

      ///SlabMaster
      { path: '/addSlabMaster', exact: true, element: <AddSlabMaster /> },
      { path: '/Slab', exact: true, element: <Slab /> },

      {
        path: '/Fee_Group_Master_Add_Edit_Screen',
        exact: true,
        element: <Fee_Group_Master_Add />,
      },
      {
        path: '/Fee_Group_Master_Search_Screen',
        exact: true,
        element: <Fee_Group_Master_Details />,
      },

      {
        path: '/Class_Master_Add_Edit_Screen',
        exact: true,
        element: <Class_Master_Add />,
      },
      {
        path: '/Class_Master_Search_Screen',
        exact: true,
        element: <Class_Master_Details />,
      },
      {
        path: '/Tc_Issue_Master_Detail_Add_Edit_Screen',
        exact: true,
        element: <TcIssue_Master_Add />,
      },
      {
        path: '/Tc_Issue_Master_Detail_Search_Screen',
        exact: true,
        element: <TcIssue_Master_Details />,
      },
      {
        path: '/Fee_Reciept_Master_Add_Edit_Screen',
        exact: true,
        element: <Fee_Reciept_Add />,
      },
      {
        path: '/Fee_Reciept_Master_Search',
        exact: true,
        element: <Fee_Reciept_Details />,
      },
      {
        path: '/Subject_Master_Add_Edit_Screen',
        exact: true,
        element: <SubjectMaster_Add />,
      },
      {
        path: '/Subject_Master_Search',
        exact: true,
        element: <SubjectMaster_Details />,
      },
      {
        path: '/Class_Detail_Master_Add_Edit_Screen',
        exact: true,
        element: <ClassDetailMaster_Add />,
      },
      {
        path: '/Class_Detail_Master_Search',
        exact: true,
        element: <ClassDetailMaster_Details />,
      },
      {
        path: '/Result_Master_New_Add_Edit_Screen',
        exact: true,
        element: <ResultDetailMaster_Add />,
      },
      {
        path: '/Result_Master_New_Search',
        exact: true,
        element: <ResultMaster_Details />,
      },

      {
        path: '/AdmisionReports',
        exact: true,
        element: <AdmisionReport />,
      },
      {
        path: '/AddSystemRecord',
        exact: true,
        element: <System_Record_Add />,
      },
      {
        path: '/SystemRecords',
        exact: true,
        element: <System_Record_Details />,
      },
      {
        path: '/Multi_Purpose_Type_Master_Add_Edit_Screen',
        exact: true,
        element: <Multipurpose_Add />,
      },
      {
        path: '/Multi_Purpose_Type_Master_Search',
        exact: true,
        element: <Multipurpose_Details />,
      },
      //{ path: '/editFeeHead', exact: true, element: <EditFeeHead /> },
      // { path: "/category", exact: true, element: <Category /> },
      // { path: "/addcategory", exact: true, element: <AddCategory /> },
      // { path: "/editcategory", exact: true, element: <EditCategory /> },

      // { path: "/additem", exact: true, element: <AddItem /> },
      // { path: "/item", exact: true, element: <Item /> },
      // { path: "/edititem", exact: true, element: <EditItem /> },

      // { path: "/invoice", exact: true, element: <Invoice/> },
      // { path: "/pdf", exact: true, element: <PDFGeneratorButton/> },
      ,
    ],
  },
];

export default ThemeRoutes;
