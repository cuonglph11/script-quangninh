const { getFetchQuangNinh, postFetchDemo, delFetchDemo, delFetchQuangNinh, postFetchQuangNinh } = require("../utils")



/**
 * CONFIG
 */
const BASE_URL = {
    DEMO: "https://demo-api.ilotusland.asia",
    QUANGNINH: "https://ilotusland-api.quantracquangninh.gov.vn"
}
const ENDPOINT = {
    GET_STATIONS: `${BASE_URL.QUANGNINH}/station-fixed/station-periodic/?filter%5Bskip%5D=0&filter%5Blimit%5D=9007199254740991`,
    GET_IMPORTED_DATA:
        `${BASE_URL.QUANGNINH}/station-fixed/report/?stationKeys=KTNM_MD_1%2Cnm_ndMD_thacthay%2Cnm_thanQN_sinhhoat%2Cnm_thanQN_congnghiep%2Cnm_Vietmindo_kedang%2Cnm_vietmindo_dapdang%2Cnm_CottoQN_nhamay%2Cnm_cottoQN_baichua%2Cnm_texhong_khela%2Cnm_texhong_caitrinh%2Cnm_KLmauQN%2Cnm_KLmauQN_hocanhquan1%2Cnm_KLmauQN_hocanhquan2%2Cnm_DongBac618_khesuoi%2Cnm_DongBac618_CauMang%2Cnm_DongBac790_diemkhaithac%2Cnm_VinhKhanh_khaitruong1%2Cnm_VinhKhanh_khaitruong2%2Cnm_thuyloiMD_HaiYen%2Cnm_thuyloiMD_KheCat%2Cnm_thuyloiMD_TrangVinh%2Cnm_thuyloiMD_DanTien%2Cnm_thuyloiMD_QuatDong%2Cnm_thuyloiMD_KimTinh%2Cnm_thuyloiMD_DoanTinh%2Cnm_QuanMinh_hothu1%2Cnm_QuanMinh_hothu2%2Cnm_thanHaLong_suoiDaMai%2Cnm_thanNamMau-suoiHoDam%2Cnm_ctHoaBinh_suoiDongVong%2Cnm_ctkdthanCamPha_BacKheCham%2Cnm_nuocsachQN_ThacNhoong%2Cnm_nuocsachQN_songHaCoi%2Cnm_nuocsachQN_songBaChe%2Cnm_nuocsachQN_songDamHa%2Cnm_thanDeoNai_Baza%2Cnm_thanDeoNai_NamDeoNai1%2Cnm_thanDeoNai_NamDeoNai2%2Cnm_thanVangDanh_suoiA%2Cnm_thanVangDanh_suoiB%2Cnm_ViglaceraDT_KinhThay%2Cnm_xinghiepThongNhat_TanMai%2Cnm_TTmoitruongnongthonQN_HaThanh%2Cnm_FLC_moongCoPhuong%2Cnm_ct397_hoKheUon2%2CNN_BvCamPha%2CNN_ctVinEco_G1%2CNN_ctVinEco_G2%2CNN_ctVinEco_G3%2CNN_ctVinEco_G4%2CNN_ctVinEco_G5%2CNN_ctHaLan%2CNN_CTdulichSaigon_GK1%2CNN_CTdulichSaigon_GK2%2CNN_khoangsanMinhDat%2CNN_ctVinhThuan_GK1%2CNN_ctVinhThuan_GK2%2CNN_ctVinhThuan_GK3%2CNN_ctVinhThuan_GK4%2CNN_ctVinhThuan_GK5%2CNN_ctVinhThuan_GK6%2CNN_ctVinhThuan_GK7%2CNN_ctVinhThuan_GK8%2CNN_ctYenHungXanh%2CNN_moitruongTKV_G%C4%901%2CNN_moitruongTKV_G%C4%902%2CNN_ctThienHuong%2CNN_thanMaoKhe_LK3%2CNN_thanMaoKhe_GKMK01%2CNN_thanMaoKhe_LKMK-01%2CNN_thanQuangHanh%2CNN_ctThangLong_DongBac%2CNN_ctBiaHaLong_G24A%2CNN_ctnuockhoangQN_LK1%2CNN_ctnuockhoangQN_LK45%2CNN_ctnuockhoangQN_LK8%2CNN_ctnuockhoangQN_LK-QH2%2CNN_ctnuockhoangQN_LK-M9%2CNN_nuocsachQN_LK541A%2CNN_nuocsachQN_LK548%2CNN_nuocsachQN_LK15%2CNN_nuocsachQN_LK274%2CNN_nuocsachQN_LK275%2CNN_nuocsachQN_LKATH10%2CNN_nuocsachQN_LK53%2CNN_nuocsachQN_LK283%2CNN_nuocsachQN_LK282%2CNN_nuocsachQN_462%2CNN_nuocsachQN_462A%2CNN_nuocsachQN_458%2CNN_nuocsachQN_G3%2CNN_ctTapDoanDongHai%2CNN_thanVangDanh_GKCG02%2CNN_thanVangDanh_GKCG03%2CNN_thanVangDanh_GK01%2CNN_thanVangDanh_GK02%2CNN_thanVangDanh_GK03%2CNN_thanVangDanh_GK04%2CNN_thanVangDanh_VD1%2CNN_thanVangDanh_VD2%2CNN_thanVangDanh_VD3%2CNN_thanVangDanh_VD4%2CNN_ctThanhThuy_NT2%2CNN_ctThanhNga_G%C4%901%2CNN_ctThanhNga_G%C4%902%2CNN_ctThanhNga_G%C4%903%2CNN_ViglaceraHaLong_GK1%2CNN_ViglaceraHaLong_GK2%2CNN_ViglaceraVanHai_NH8%2CNN_xnkthuysanQN%2CNN_xkthuysan2QN_5D%2CNN_xkthuysan2QN_6D%2CNN_Sudoan395QK4%2CKTTV_HOYENLAP%2CKTTV_HOTRANGVINH%2CKTTV_CHUCBAISON%2CKTTV_DAMHADONG%2CKTTV_QUATDONG%2CKTTV_VT%26XDQN_CANGMUICHUA%2CKTTV_CVHHQN_CANGVANGIA%2CKTTV_KHOVAN%26CANGCP_CANGTHANCP%2CKTTV_XMCP_NHAMAYXMCP%2CKTTV_CANGQUANGNINH%2CKTTV_TNHHCANGCTNQTCL%2CKTTV_XANGDAUB12%2CKTTV_DONGTAUHALONG%2CKTTV_CANGHONGAI_VINASHIN%2CKTTV_XMHL_NHAMAYXMHL%2CKTTV_XMTL_NHAMAYXMTL%2CKTTV_XANGDAUCAILAN%2CKTTV_SOGTVT_CAUBC%2CKTTV_BOTBACHDANG%2CKTTV_TUNGLAM_CAPHOANGLONG%2CKTTV_DTTMDVVINACOMIN%2CKTTV_MATTROIHL%2CKTTV_BQLVQGBAITULONG%2CKTTV_TUNGLAM_CAPBACHLONG%2Cnm_TTmnnongthongQN_KinhThay%2Cnm_N%C4%90UB_lammat%2Cnm_N%C4%90UB_nuocngot%2Cnm_duonghuy_khegiua%2Cttcuaong_bara%2Cttcuaong_md%2CnuocsachQN_datrang%2CnuocsachQN_trungluong%2CnuocsachQN_tienyen%2CnuocsachQN_vangia%2Cnn_gomdatviet%2Ctanviethung_nm%2CkvDabac_songsinh%2CkvDabac_songdabac%2CkvDabac_davach1%2CkvDabac_davach2%2CkhaithacksDongBac_TL01%2CksDongBac_khehum%2CksDongBac_dongdamai%2CkhesimDB_hochua200%2Cthanhalong_moong21%2Cytevandon%2Cytehaiha%2Cytehaiha2%2CXMHL_Moong2%2CNDDT-songcam%2Cmaiquyen_aotien%2Ctldt_trailoc1%2Ctldt_daplang%2Ctldt_nhabo%2Ctldt_cole%2Ctldt_kheuon1%2Ctldt_kheche%2Ctldt_trailoc2%2Ctldt_dongdo1%2Ctldt_dongdo2%2Ctldt_bechau%2Ctldt_datrang%2Ctldt_rocchay%2Ctldt_yenduong%2Ctldt_tanyen%2Ctldt_xuanson%2Ctldt_tanviet%2Ctldt_binhluc%2Ctldt_binhson%2Ctldt_damthuy%2Cquawaco_caovan%2CmattroiHL%2CmattroiHL2%2CDongbac35_lothien%2Cnm_thanquanghanh%2Cxmhoangthach%2CChebienthan1%2Cchebienthan2%2ChoNoiHoang%2CsuoiDahang%2CGiengLKA%2CGiengLKB%2Csaudon1%2CgiengGK1%2Ctandan1%2ChoVanLong%2Cquawaco101%2Cquawaco%2CTEST%2Cthanhatu_HT01%2Cthanhatu_Bacbangdanh%2Ckhechammoong21%2Ctmkduongbi%2Ctmkdub_damke%2Cquawaco259%2Cquawaco12%2CQuawacolo3%2Cquawacolo12%2CdautuVanDon%2Cdemo_thanh%2C91khecham%2C91hothien%2C91gk1%2Clamthach_hangmai%2Cthanhtam668%2CMicco1%2Cmicco2%2CkinhdoanhthanCP%2Cantimonduonghuy%2Cantimonduonghuy2%2Cdulichhl%2Cdulichhl2%2Cdulichhl3%2Ctuvanphapluat%2Cmoitruongmo1%2Cmoitruongmo2&reportTypes=ExcelPeriodic%2CManual`,
    CREATE_STATION: `${BASE_URL.DEMO}/station-fixed/station-periodic/`,
    DELETE_IMPORTED_DATA: `${BASE_URL.QUANGNINH}/station-fixed/report`,
    // DELETE_IMPORTED_DATA: `${BASE_URL.DEMO}/station-fixed/report`
    IMPORT_DATA: `${BASE_URL.QUANGNINH}/station-fixed/report`,
    IMPORT_DATA_DEMO: `${BASE_URL.DEMO}/station-fixed/report`,
}

const getAllStationsFromQN = () => {
    return getFetchQuangNinh(ENDPOINT.GET_STATIONS)

}


const getAllImportedData = () => {
    // console.log("GET", ENDPOINT.GET_IMPORTED_DATA)
    return getFetchQuangNinh(ENDPOINT.GET_IMPORTED_DATA)
}


const createOneStation = async ({ key, name, measuringList }) => {
    const payload = {
        key,
        name,
        "stationTypeId": "6343c322825689001cf0184b",
        "qcvnId": "5f4e09229cef930011dc0be5",
        "measuringList": [
            {
                "key": "TOC",
                "isApplyQCVN": true,
                "name": "TOC",
                "unit": ""
            },
            {
                "key": "FLOW",
                "isApplyQCVN": false,
                "minLimit": null,
                "maxLimit": null,
                "name": "Lưu lượng",
                "unit": "m3/h"
            }
        ],
        "mapLocation": {
            "lat": 4,
            "lng": 3
        }
    }
    return postFetchDemo(ENDPOINT.CREATE_STATION)
}

const getImportedDataByMe = async () => {
    const allData = await getAllImportedData()
    return allData.data.filter(data => data.createdBy.email === "anh.vu@ilotusland.com")
}

const deleteImportedData = reportIds => {
    const reportIdsParam = reportIds.join(",")
    // delFetchDemo(`${ENDPOINT.DELETE_IMPORTED_DATA}?reportIds=${reportIdsParam}`)
    delFetchQuangNinh(`${ENDPOINT.DELETE_IMPORTED_DATA}?reportIds=${reportIdsParam}`)

}
const addOneStation = payload => {
    // console.log(payload,'payloadpayload')
    // return postFetchDemo(ENDPOINT.IMPORT_DATA_DEMO, payload)
    return postFetchQuangNinh(ENDPOINT.IMPORT_DATA, payload)
}
module.exports = {
    getAllImportedData,
    getAllStationsFromQN,
    createOneStation,
    getImportedDataByMe,
    deleteImportedData,
    addOneStation
}