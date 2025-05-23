// D:\github\dash-si-dev\app\profile\page.js
"use client";

import React, { useState } from 'react';
import { Layout, Form, Input, Select, Button, Card, Typography, Modal, Alert, message } from 'antd';

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

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    accountNumber: "",
    npwp: "",
    accountName: ""
  });

  // Dummy bank options - would be fetched from database
  const bankOptions = [
    { value: "BCA", label: "Bank Central Asia (BCA)" },
    { value: "BNI", label: "Bank Negara Indonesia (BNI)" },
    { value: "BRI", label: "Bank Rakyat Indonesia (BRI)" },
    { value: "MANDIRI", label: "Bank Mandiri" },
    { value: "CIMB", label: "CIMB Niaga" },
    { value: "DANAMON", label: "Bank Danamon" },
    { value: "PERMATA", label: "Bank Permata" },
    { value: "MAYBANK", label: "Maybank Indonesia" },
    { value: "BNI_SYARIAH", label: "BNI Syariah" },
    { value: "BSI", label: "Bank Syariah Indonesia (BSI)" }
  ];

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
  const [isFormChanged, setIsFormChanged] = useState(false);

  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const isDataChanged = (newData) => {
    return (
      newData.bank !== sellerData.banking.bank ||
      newData.npwp !== sellerData.banking.npwp ||
      newData.accountNumber !== sellerData.banking.accountNumber ||
      newData.accountName !== sellerData.banking.accountName
    );
  };
  

  // Format NPWP function
  const formatNPWP = (value) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Limit to 15 digits
    const limited = numbers.slice(0, 15);
    
    // Apply formatting: XX.XXX.XXX.X-XXX.XXX
    let formatted = limited;
    if (limited.length > 2) {
      formatted = limited.slice(0, 2) + '.' + limited.slice(2);
    }
    if (limited.length > 5) {
      formatted = limited.slice(0, 2) + '.' + limited.slice(2, 5) + '.' + limited.slice(5);
    }
    if (limited.length > 8) {
      formatted = limited.slice(0, 2) + '.' + limited.slice(2, 5) + '.' + limited.slice(5, 8) + '.' + limited.slice(8);
    }
    if (limited.length > 9) {
      formatted = limited.slice(0, 2) + '.' + limited.slice(2, 5) + '.' + limited.slice(5, 8) + '.' + limited.slice(8, 9) + '-' + limited.slice(9);
    }
    if (limited.length > 12) {
      formatted = limited.slice(0, 2) + '.' + limited.slice(2, 5) + '.' + limited.slice(5, 8) + '.' + limited.slice(8, 9) + '-' + limited.slice(9, 12) + '.' + limited.slice(12);
    }
    
    return formatted;
  };

  // Validate account number
  const validateAccountNumber = (accountNumber) => {
    const cleanNumber = accountNumber.replace(/\D/g, '');
    if (cleanNumber.length < 7) {
      return "Nomor rekening minimal 7 digit";
    }
    if (cleanNumber.length > 16) {
      return "Nomor rekening maksimal 16 digit";
    }
    return "";
  };

  // Validate NPWP
  const validateNPWP = (npwp) => {
    const cleanNumber = npwp.replace(/\D/g, '');
    if (cleanNumber.length === 0) {
      return ""; // Boleh kosong
    }
    if (cleanNumber.length !== 15) {
      return "NPWP harus terdiri dari 15 digit";
    }
    return "";
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
    setFormErrors({ accountNumber: "", npwp: "", accountName: "" });
    setIsFormChanged(false);
    setIsModalVisible(true);
  };

  // Handle canceling the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setFormErrors({ accountNumber: "", npwp: "", accountName: "" });
    setIsFormChanged(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let newValue = value;
    let newErrors = { ...formErrors };

    if (name === 'npwp') {
      newValue = formatNPWP(value);
      newErrors.npwp = validateNPWP(newValue);
    } else if (name === 'accountNumber') {
      // Only allow numbers for account number
      newValue = value.replace(/\D/g, '');
      newErrors.accountNumber = validateAccountNumber(newValue);
    }

    if (name === 'accountName') {
      newErrors.accountName = value.trim() ? "" : "Nama tidak boleh kosong";
    }    

    const updatedData = {
      ...formData,
      [name]: newValue
    };

    setFormData(updatedData);
    setFormErrors(newErrors);
    setIsFormChanged(isDataChanged(updatedData));
  };

  // Handle bank selection change
  const handleBankChange = (value) => {
    const updatedData = {
      ...formData,
      bank: value
    };
    
    setFormData(updatedData);
    setIsFormChanged(isDataChanged(updatedData));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate all fields before submission
    const accountError = validateAccountNumber(formData.accountNumber);
    const npwpError = validateNPWP(formData.npwp);
    const accountNameError = formData.accountName.trim() ? "" : "Nama tidak boleh kosong";

    if (accountError || npwpError || accountNameError) {
      setFormErrors({
        accountNumber: accountError,
        npwp: npwpError,
        accountName: accountNameError
      });
      return;
    }

    // Update the seller data with form values
    setSellerData(prev => ({
      ...prev,
      banking: {
        ...formData
      }
    }));
    
    // Show success message
    message.success('Perubahan Data Berhasil Disimpan');
    
    // Close the modal
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Layout>
        <Content>
          <div className="max-w-4xl mx-auto p-4 flex flex-col gap-5">
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <Text className="flex items-center text-[#0c74bc]">
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#0c74bc] text-white text-xs">i</span>
                Data seller dan alamat seller hanya bisa diubah dari website/ aplikasi mobile Indopaket.
              </Text>
            </div>
                        
            {/* Data Seller Section */}
            <Card className="mb-6 shadow-sm">
              <div className="border-l-4 border-[#0c74bc] pl-2 mb-4">
                <Title level={4} className="text-[#0c74bc] m-0">Data Seller</Title>
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
              <div className="border-l-4 border-[#0c74bc] pl-2 mb-4">
                <Title level={4} className="text-[#0c74bc] m-0">Alamat Seller</Title>
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
              <div className="border-l-4 border-[#0c74bc] pl-2 mb-4">
                <Title level={4} className="text-[#0c74bc] m-0">Informasi Bisnis</Title>
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
              <div className="border-l-4 border-[#0c74bc] pl-2 mb-4">
                <Title level={4} className="text-[#0c74bc] m-0">No. Rekening & NPWP</Title>
              </div>
                            
              <Form layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Bank">
                    <Input value={sellerData.banking.bank} readOnly />
                  </Form.Item>
                  <Form.Item label="NPWP">
                    <Input value={sellerData.banking.npwp} readOnly />
                  </Form.Item>
                </div>
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="No. Rekening">
                    <Input value={sellerData.banking.accountNumber} readOnly />
                  </Form.Item>
                  <Form.Item label="Nama Pemilik Rekening">
                    <Input value={sellerData.banking.accountName} readOnly />
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
            title="Ubah Nomor Rekening & NPWP"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Batal
              </Button>,
              <Button 
                key="submit" 
                type="primary" 
                style={isFormChanged ? { backgroundColor: '#0c74bc' } : {}}
                onClick={handleSubmit}
                disabled={!isFormChanged || !!formErrors.npwp || !!formErrors.accountNumber || !!formErrors.accountName}
              >
                Simpan
              </Button>,
            ]}
            width={700}
          >
            <Form layout="vertical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Form.Item 
                  label="Bank"
                  validateStatus={formData.bank ? 'success' : ''}
                >
                  <Select 
                    value={formData.bank}
                    onChange={handleBankChange}
                    placeholder="Pilih Bank"
                    className="w-full"
                  >
                    {bankOptions.map(bank => (
                      <Option key={bank.value} value={bank.value}>
                        {bank.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item 
                  label="NPWP"
                  validateStatus={formErrors.npwp ? 'error' : ''}
                  help={formErrors.npwp}
                >
                  <Input 
                    name="npwp"
                    value={formData.npwp}
                    onChange={handleInputChange}
                    placeholder="Masukkan 15 digit NPWP"
                    maxLength={18} // Formatted length with dots and dash
                  />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Format: 99.999.999.9-999.999
                  </Text>
                </Form.Item>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item 
                  label="No. Rekening"
                  validateStatus={formErrors.accountNumber ? 'error' : ''}
                  help={formErrors.accountNumber}
                >
                  <Input 
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Masukkan nomor rekening"
                    maxLength={16}
                  />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    7-16 digit nomor rekening
                  </Text>
                </Form.Item>
                <Form.Item
                  label="Nama Pemilik Rekening"
                  validateStatus={formErrors.accountName ? "error" : ""}
                  help={formErrors.accountName}
                >
                  <Input 
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    placeholder="Nama pemilik rekening"
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