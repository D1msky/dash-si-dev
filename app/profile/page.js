// D:\github\dash-si-dev\app\profile\page.js
"use client";

import React, { useState } from 'react';
import { Layout, Form, Input, Select, Button, Card, Typography, Modal } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function ProfilePage() {
  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // State for form data in the modal
  const [formData, setFormData] = useState({
    bank: "",
    npwp: "",
    accountNumber: "",
    accountName: ""
  });

  // Dummy data - this would be replaced with dynamic data in a real application
  const [sellerData, setSellerData] = useState({
    personal: {
      name: "Riani BM",
      brand: "Seedsunset",
      phone: "081243765501",
      email: "rianibm@gmail.com"
    },
    address: {
      province: "DKI Jakarta",
      city: "Jakarta Barat",
      district: "Cengkareng",
      subdistrict: "Cengkareng Barat",
      postalCode: "11730",
      fullAddress: "Kost Uncle Dee Co Living Blok A4 No. 31"
    },
    business: {
      products: "Elektronik",
      monthlyVolume: "31 - 50 Paket",
      instagram: "rianibm",
      facebook: "",
      line: "",
      website: ""
    },
    banking: {
      bank: "BCA",
      npwp: "99.999.999.9-999.999",
      accountNumber: "0200000000",
      accountName: "Riani"
    }
  });
    
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Handle showing the modal
  const showModal = () => {
    // Initialize form data with current values
    setFormData({
      bank: sellerData.banking.bank,
      npwp: sellerData.banking.npwp,
      accountNumber: sellerData.banking.accountNumber,
      accountName: sellerData.banking.accountName
    });
    setIsModalVisible(true);
  };

  // Handle canceling the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Update the seller data with form values
    setSellerData(prev => ({
      ...prev,
      banking: {
        ...formData
      }
    }));
    
    // Close the modal
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Layout>
        <Content>
          <div className="max-w-4xl mx-auto p-4 flex flex-col gap-5">
            <div className="bg-primary-foreground p-4 rounded-md mb-6">
              <Text className="flex items-center text-primary">
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs">i</span>
                Data seller dan alamat seller hanya bisa diubah dari website/ aplikasi mobile Indopaket.
              </Text>
            </div>
                        
            {/* Data Seller Section */}
            <Card className="mb-6 shadow-sm">
              <div className="border-l-4 border-primary pl-2 mb-4">
                <Title level={4} className="text-primary m-0">Data Seller</Title>
              </div>
                            
              <Form layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Nama">
                    <Input value={sellerData.personal.name} disabled />
                  </Form.Item>
                  <Form.Item label="Nama Brand">
                    <Input value={sellerData.personal.brand} disabled />
                  </Form.Item>
                </div>
                            
                <Form.Item label="Nomor Handphone">
                  <Input value={sellerData.personal.phone} disabled />
                </Form.Item>
                            
                <Form.Item label="Email">
                  <Input value={sellerData.personal.email} disabled />
                </Form.Item>
              </Form>
            </Card>

            {/* Alamat Seller Section */}
            <Card className="mb-6 shadow-sm">
              <div className="border-l-4 border-primary pl-2 mb-4">
                <Title level={4} className="text-primary m-0">Alamat Seller</Title>
              </div>
                            
              <Form layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Provinsi">
                    <Select value={sellerData.address.province} disabled className="w-full">
                      <Option value={sellerData.address.province}>{sellerData.address.province}</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Kota / Kabupaten">
                    <Select value={sellerData.address.city} disabled className="w-full">
                      <Option value={sellerData.address.city}>{sellerData.address.city}</Option>
                    </Select>
                  </Form.Item>
                </div>
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Kecamatan">
                    <Select value={sellerData.address.district} disabled className="w-full">
                      <Option value={sellerData.address.district}>{sellerData.address.district}</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Kelurahan">
                    <Select value={sellerData.address.subdistrict} disabled className="w-full">
                      <Option value={sellerData.address.subdistrict}>{sellerData.address.subdistrict}</Option>
                    </Select>
                  </Form.Item>
                </div>
                            
                <Form.Item label="Kode Pos">
                  <Select value={sellerData.address.postalCode} disabled className="w-full">
                    <Option value={sellerData.address.postalCode}>{sellerData.address.postalCode}</Option>
                  </Select>
                </Form.Item>
                            
                <Form.Item label="Alamat">
                  <Input value={sellerData.address.fullAddress} disabled />
                </Form.Item>
              </Form>
            </Card>

            {/* Informasi Bisnis Section */}
            <Card className="mb-6 shadow-sm">
              <div className="border-l-4 border-primary pl-2 mb-4">
                <Title level={4} className="text-primary m-0">Informasi Bisnis</Title>
              </div>
                            
              <Form layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Produk Yang Dijual">
                    <Input value={sellerData.business.products} disabled />
                  </Form.Item>
                  <Form.Item label="Jumlah Produk per Bulan">
                    <Input value={sellerData.business.monthlyVolume} disabled />
                  </Form.Item>
                </div>
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Instagram">
                    <Input value={sellerData.business.instagram} disabled />
                  </Form.Item>
                  <Form.Item label="Facebook">
                    <Input value={sellerData.business.facebook} disabled />
                  </Form.Item>
                </div>
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="LINE">
                    <Input value={sellerData.business.line} disabled />
                  </Form.Item>
                  <Form.Item label="Website">
                    <Input value={sellerData.business.website} disabled />
                  </Form.Item>
                </div>
              </Form>
            </Card>

            {/* No. Rekening & NPWP Section */}
            <Card className="mb-6 shadow-sm">
              <div className="border-l-4 border-primary pl-2 mb-4">
                <Title level={4} className="text-primary m-0">No. Rekening & NPWP</Title>
              </div>
                            
              <Form layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Bank">
                    <Input value={sellerData.banking.bank} disabled />
                  </Form.Item>
                  <Form.Item label="NPWP">
                    <Input value={sellerData.banking.npwp} disabled />
                  </Form.Item>
                </div>
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="No. Rekening">
                    <Input value={sellerData.banking.accountNumber} disabled />
                  </Form.Item>
                  <Form.Item label="Nama">
                    <Input value={sellerData.banking.accountName} disabled />
                  </Form.Item>
                </div>
              </Form>
                            
              <div className="flex justify-end mt-4">
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#0c74bc' }}
                  onClick={showModal}
                >
                  Ubah Data
                </Button>
              </div>
            </Card>
          </div>

          {/* Modal for editing banking information */}
          <Modal
            title="Edit Informasi Rekening & NPWP"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Batal
              </Button>,
              <Button 
                key="submit" 
                type="primary" 
                style={{ backgroundColor: '#0c74bc' }}
                onClick={handleSubmit}
              >
                Simpan
              </Button>,
            ]}
            width={700}
          >
            <Form layout="vertical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Form.Item label="Bank">
                  <Input 
                    name="bank"
                    value={formData.bank}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="NPWP">
                  <Input 
                    name="npwp"
                    value={formData.npwp}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="No. Rekening">
                  <Input 
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Nama">
                  <Input 
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}