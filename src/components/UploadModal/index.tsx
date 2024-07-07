import React, {useEffect, useState} from "react";
import {Button, message, Modal, Upload, UploadFile, UploadProps} from "antd";
import ProCard from "@ant-design/pro-card";
import ImgCrop from "antd-img-crop";
import {RcFile} from "antd/es/upload/interface";
import {PlusOutlined} from "@ant-design/icons";
import {style} from "@umijs/bundler-esbuild/dist/plugins/style";
import {requestConfig} from "@/requestConfig";

export type Props = {
  title: string;
  open: boolean;
  onCancel: () => void;
  url?: string;
  onSubmit: (url:any) => Promise<any>;
}
const UploadModal: React.FC<Props> = (props) => {

  const { title, open,onCancel,url,onSubmit } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [resUrl,setResUrl] = useState<string | undefined>()
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const uploadFileTypeList = ['image/jpeg','image/jpg','image/svg','image/png','image/webp','image/jfif']

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    const uploadFileList = [...fileList];
    if (url){
      uploadFileList[0] = {
        uid: '1',
        name: url?.substring(url!.lastIndexOf('-') + 1),
        status: 'done',
        percent: 100,
        url: url
      }
      setFileList(uploadFileList);
    }else {
      setFileList([]);
    }
  }, [url]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('-') + 1));
  };

  const beforeUpload = (file: RcFile) => {
    const fileType = uploadFileTypeList.includes(file.type);
    if (!fileType) {
      message.error('不支持该图片类型,请上传jpg/png/svg/jpeg/webp格式!');
    }
    // 图片大小不能超过2M
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M!');
    }
    if (!isLt2M && !fileType){
      const uploadFileList = [...fileList];
      uploadFileList[0] = {
        uid: '-1',
        name: 'error',
        status: 'error',
        percent: 100,
      }
      setFileList(uploadFileList);
      return false;
    }
    return fileType && isLt2M;
  };

  const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
  );


  const prop: UploadProps = {
    name: 'file',
    action: `${requestConfig.baseURL}api/file/upload?biz=interface_avatar`,
    headers: {
      // @ts-ignore
      Authorization: localStorage.getItem('token') || null,
    },
    withCredentials: true,
    onChange({ file, fileList: newFileList }) {
      const { response } = file;
      if (file.response && response.data) {
        const { uid, name, status, url } = response.data;
        const uploadFileList = [...fileList];
        if (response.code !== 0 || status === 'error') {
          message.error(response.message);
          file.status = 'error';
          uploadFileList[0] = {
            uid: '-1',
            name: 'error',
            status: 'error',
            percent: 100,
          };
          setFileList(uploadFileList);
          return;
        }
        file.status = status;
        uploadFileList[0] = {
          uid: uid,
          name: name,
          status: status,
          url: url,
          percent: 100,
        };
        setFileList(uploadFileList);
        setResUrl(url);
      } else {
        setFileList(newFileList);
        setResUrl('');
      }
    },
    listType: 'picture-circle',
    onPreview: handlePreview,
    fileList: fileList,
    beforeUpload: beforeUpload,
    maxCount: 1,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        centered
        footer={null}
        onCancel={onCancel}
      >
        <ProCard layout={'center'}>
          <ImgCrop
            rotationSlider
            quality={1}
            aspectSlider
            maxZoom={4}
            cropShape={'round'}
            zoomSlider
            showReset
          >
            <Upload {...prop}>
              {fileList.length >= 1 ? undefined : uploadButton}
            </Upload>
          </ImgCrop>
        </ProCard>
        <ProCard layout={'center'}>
          <Button size={'large'} style={{width: 100}} type={'primary'} onClick={async () => {
            onSubmit?.(resUrl);
          }}>
            上传图片
          </Button>
        </ProCard>
        <Modal open={previewOpen} footer={null} title={previewTitle} onCancel={handleCancel}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <img src={previewImage} alt={'example'}/>
          </div>
        </Modal>
      </Modal>
    </>
  )
}

export default UploadModal;

