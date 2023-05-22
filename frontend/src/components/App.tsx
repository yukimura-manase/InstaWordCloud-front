import { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import styled from "styled-components";
// Material_UI_Icons
import IconButton from "@mui/material/IconButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// SVG_Icons
import CSVFileIcon from "../assets/icons/csv_file.svg";
import ExclamationTriangleIcon from "../assets/icons/exclamation_triangle.svg";

// Component_Test
// import CheckSwitch from "./CheckSwitch";
// import ImageFileUpload from "./ImageFileUpload";
// import SelectBox from "./SelectBox";
import TableList from "./TableList";

// 行(Row)のDataType
interface JsonDataType {
  [key: string]: any;
}
// TableDataのType
interface TableDataType {
  columnKeyList: string[];
  rowDataList: JsonDataType[];
}

const App = () => {
  // CSV_File_State & Upload
  const [csvFile, setCSV] = useState<Blob | MediaSource | undefined>(undefined);
  // SetされたCSV_Fileの参照情報を確認するための ref_Data: Reference_Data
  // 初期値を undefined にすると、型エラー => null を設定する
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const csvSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("event.target.files", event.target.files);
      console.log("fileInputRef", fileInputRef);
      setCSV(event.target.files[0]);
      setIsDisabledDeleteBtn(false);
    }
  };

  // WordCloudを作成するためのFunction
  // => [B-E]に対してFile情報をPostして、WordCloudを作成してもらい、それを表示する
  const createWordCloud = () => {
    console.log("createWordCloud");

    // TODO: WordCloud作成処理
    if (csvFile) {
      // FormData_Instanceを作成する
      const FD = new FormData();
      let csv = csvFile as Blob;
      FD.append("csv_file", csv);
    } else {
      alert("CSVファイルを選択してください。");
    }
  };

  // SetしているCSV_FileをDeleteする
  const deleteSetFile = () => {
    // console.log("event.target.files[0]", event.target.files[0]);
    if (fileInputRef.current) {
      // SetしているDOM上の CSV_File をDeleteする
      fileInputRef.current.value = "";
    }
    // Stateを削除する
    setCSV(undefined);
    setIsDisabledDeleteBtn(true);
    closeDeleteDialog();
  };

  // Table_Componentに渡すDataSet: Table_Props_Data
  const [displayTableData, setDisplayTableData] = useState<
    TableDataType | undefined
  >(undefined);

  const createTableColumnKeyList = (object: JsonDataType) => {
    return Object.keys(object);
  };

  // Flask-APIで、解析した CSVファイルをJSON化したData
  const [jsonCsvData, setJsonCsvData] = useState<JsonDataType[] | undefined>(
    undefined
  );

  // jsonCsvData の変更を監視する
  useEffect(() => {
    if (jsonCsvData) {
      // Table_Props_Data を作成する
      const columnKeyList = createTableColumnKeyList(jsonCsvData[0]);
      setDisplayTableData({
        columnKeyList: columnKeyList,
        rowDataList: jsonCsvData,
      });
      // Table_Component_Display_Flag
      setIsCSVInfoDisplay(true);
    }
  }, [jsonCsvData]);

  // CSV_Info_Display_制御_Flag
  const [isCSVInfoDisplay, setIsCSVInfoDisplay] = useState<boolean>(false);

  // CSVの中身の情報、ColumnやRow_Dataを表示するためのFunction
  const displayCSVInfo = async () => {
    console.log("displayCSVInfo");
    console.log("csvFile", csvFile);
    console.log("typeof", typeof csvFile);

    if (csvFile) {
      // FormData_Instanceを作成する
      const formData = new FormData();
      let csv = csvFile as Blob;

      // key: file
      formData.append("file", csv);
      console.log("formData", formData);

      try {
        // Flask-APIに、Post通信
        const formResponse = await fetch(
          "http://localhost:5001/api/create_csv_info",
          {
            method: "POST", // HTTP-Methodを指定する！
            body: formData, // リクエストボディーにフォームデータを設定
          }
        );

        // Response.json() => 自動で、Parseされる
        const parseDataList = await formResponse.json();
        console.log("parseDataList", parseDataList);
        console.log("parseDataList_typeof", typeof parseDataList);

        // JsonDataをSetする
        setJsonCsvData(parseDataList);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("CSVファイルを選択してください。");
    }
  };

  // 削除_BtnのDisabled制御 => Default: true
  const [isDisabledDeleteBtn, setIsDisabledDeleteBtn] = useState<boolean>(true);

  // 削除_Dialog
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  // 削除ボタン-Click
  const handleDeleteClick = () => {
    openDeleteDialog();
  };

  // DeleteDialogを開く処理
  const openDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  };

  // DeleteDialogで、キャンセルを押したときの処理
  const closeDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  return (
    <AppWrapper>
      <div className="app_wrapper">
        {/* Header */}
        <header className="app_header">
          <h1>InstaWordCloud-App</h1>
          <p>
            Instagramの投稿内容をまとめたCSVファイルの内容からWordCloudを作成するAppです🔥
          </p>
        </header>
        <main className="main_wrapper">
          {isCSVInfoDisplay ? (
            //  Table_Component
            displayTableData ? (
              <TableList
                columnKeyList={displayTableData?.columnKeyList}
                rowDataList={displayTableData?.rowDataList}
              />
            ) : (
              <span></span>
            )
          ) : (
            // CSV_Image_Icon
            <div className="csv_icon_wrapper">
              <img
                src={CSVFileIcon}
                alt="CSV_image"
                style={{
                  width: "15%",
                }}
              />
            </div>
          )}
          {/* CSV_Upload_Interface */}
          <div className="csv_input_wrapper">
            <label htmlFor="csv_file_input">
              <input
                id="csv_file_input"
                type="file"
                accept=".csv"
                className="custom_file_input"
                onChange={(event) => {
                  csvSetter(event);
                }}
                // SetされたFileを参照するための追跡情報
                ref={fileInputRef}
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              />
            </label>
            {/* Delete-Btn */}
            <span>
              <IconButton
                onClick={() => handleDeleteClick()}
                disabled={isDisabledDeleteBtn}
                className="icon_btn"
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#33dbae",
                  },
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </div>

          {/* Btn_Wrapper */}
          <div className="btn_wrapper">
            {/* WordCloud作成-Btn */}
            <Button
              variant="contained"
              onClick={() => createWordCloud()}
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                width: "150px",
                backgroundColor: "#33dbae",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              WordCloud作成
            </Button>

            {/* CSV_Info_Display_Btn */}
            <Button
              variant="contained"
              onClick={() => displayCSVInfo()}
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                width: "150px",
                backgroundColor: "darkgray",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              CSVの中身を表示
            </Button>
          </div>
        </main>
      </div>

      {/* Delete_Dialog */}
      <div>
        <Dialog open={isOpenDeleteDialog} onClose={closeDeleteDialog}>
          {/* Main-Part: Icon & Text */}
          <DialogContent
            sx={{
              padding: "50px 60px 0px 60px",
            }}
          >
            <div className="delete_dialog_icon_wrapper">
              {/* 三角形の注意アイコン */}
              <img
                src={ExclamationTriangleIcon}
                alt=""
                style={{
                  height: "100px",
                  width: "100px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <p
                style={{
                  color: "red",
                  marginTop: "12px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                削除の前にご確認ください
              </p>
            </div>
            <div>
              <p
                style={{
                  marginTop: "12px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                削除すると該当のCSVが
                <br />
                選択から外されます。
              </p>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: "row",
              justifyContent: "center",
              gap: "12px",
              padding: "30px",
              // paddingBottom: "40px",
            }}
          >
            <Button
              onClick={closeDeleteDialog}
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                color: "#707070;",
                width: "150px",
                border: "1px solid #e4e4e4",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => deleteSetFile()}
              autoFocus
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                width: "150px",
                color: "#fff",
                backgroundColor: "red",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              削除
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AppWrapper>
  );
};

// App_ComponentでのStyle
const AppWrapper = styled.div`
  /* Headerエリアに対するスタイル */
  .app_header {
    height: 15%;
    background-color: #5050e1;
    color: #fff;
    text-align: center;
  }
  /* Mainエリアに対するスタイル */
  .main_wrapper {
    text-align: center;
    padding: 5%;
  }
  /* CSV_Iconエリアに対するスタイル */
  .csv_icon_wrapper {
    width: 100%;
    text-align: center;
  }
  /* CSV_File_Inputエリアに対するスタイル */
  .csv_input_wrapper {
    margin-top: 35px;
  }
  /* Btnエリアに対するスタイル */
  .btn_wrapper {
    display: flex;
    justify-content: center;
    gap: 5%;
    margit-top: 12%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 50px;
  }
`;

export default App;
