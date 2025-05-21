'use client';
import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { Icon } from '@iconify/react';
import DashboardTieringSection from '@/src/component/DashboardTieringSection';

const { Title, Text } = Typography;

// Dummy service to fetch package data
const fetchPackageData = () =>
  new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate dummy data for each status category
      const receivedCount = 12;
      const inProcessCount = 12;
      const canceledCount = 12;
      const totalCount = receivedCount + inProcessCount + canceledCount;

      resolve({
        received: {
          count: receivedCount,
          label: 'Sudah Diterima'
        },
        inProcess: {
          count: inProcessCount,
          label: 'Dalam Proses Pengiriman'
        },
        canceled: {
          count: canceledCount,
          label: 'Dibatalkan/Kadaluarsa'
        },
        totalCount: totalCount,
        hasPackages: totalCount > 0
      });
    }, 500);
  });

export default function Dashboard() {
  const [packageData, setPackageData] = useState({
    received: { count: 0 },
    inProcess: { count: 0 },
    canceled: { count: 0 },
    totalCount: 0,
    hasPackages: false,
    loading: true
  });

  useEffect(() => {
    // Fetch package data on component mount
    fetchPackageData().then((data) => {
      setPackageData({
        ...data,
        loading: false
      });
    });
  }, []);

  return (
    <>
      <h2 className="font-bold text-2xl mb-5">Dashboard</h2>
      
      {/* Total Pengiriman */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
        {packageData.loading ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-2xl m-0">Total Pengiriman</h2>
            </div>
            <Row gutter={16}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Col span={8} key={i}>
                  <Card
                    className="rounded-xl border-none animate-pulse"
                    style={{ backgroundColor: '#f9fafb' }}
                    styles={{ body: { padding: '24px' } }}
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full" />
                      </div>
                      <div className="font-semibold text-2xl text-gray-300 mb-1 h-8">
                        <div className="h-6 w-2/3 mx-auto bg-gray-300 rounded" />
                      </div>
                      <div className="text-base h-6">
                        <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded" />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-gray-400 mt-4 text-sm italic">
              Sedang mengambil data...
            </div>
          </>
        ) : packageData.hasPackages ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-2xl m-0">
                Total Pengiriman
              </h2>
              <a href="#" className="text-blue-600 flex items-center no-underline">
                Riwayat Pengiriman
                <Icon icon="mdi:chevron-right" className="ml-1" />
              </a>
            </div>
            <Row gutter={16}>
              {/* Sudah Diterima */}
              <Col span={8}>
                <Card
                  className="rounded-xl border-none"
                  style={{ backgroundColor: '#F0FBF5' }}
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <img 
                        src="/assets/check.png" 
                        alt="Received" 
                        className="w-24 h-24" 
                      />
                    </div>
                    <div className="font-semibold text-2xl text-gray-900 mb-1">
                      {packageData.received.count} Paket
                    </div>
                    <div className="text-base text-green-600">
                      {packageData.received.label}
                    </div>
                  </div>
                </Card>
              </Col>
              
              {/* Dalam Proses Pengiriman */}
              <Col span={8}>
                <Card
                  className="rounded-xl border-none"
                  style={{ backgroundColor: '#FFFBEB' }}
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <img 
                        src="/assets/pending.png" 
                        alt="In Process" 
                        className="w-24 h-24" 
                      />
                    </div>
                    <div className="font-semibold text-2xl text-gray-900 mb-1">
                      {packageData.inProcess.count} Paket
                    </div>
                    <div className="text-base text-amber-600">
                      {packageData.inProcess.label}
                    </div>
                  </div>
                </Card>
              </Col>
              
              {/* Dibatalkan/Kadaluarsa */}
              <Col span={8}>
                <Card
                  className="rounded-xl border-none"
                  style={{ backgroundColor: '#FEF2F2' }}
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <img 
                        src="/assets/cancel.png" 
                        alt="Canceled" 
                        className="w-24 h-24" 
                      />
                    </div>
                    <div className="font-semibold text-2xl text-gray-900 mb-1">
                      {packageData.canceled.count} Paket
                    </div>
                    <div className="text-base text-red-600">
                      {packageData.canceled.label}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="text-gray-500 mt-4 text-sm">
              Menampilkan data akumulasi pengiriman
            </div>
          </>
        ) : (
          <>
            <Title level={3} className="!mb-0">Total Pengiriman</Title>
            <Card title="Total Pengiriman" className="w-72 border-none">
              <p>0 Paket</p>
              <p>Belum Ada Paket Yang Dikirim</p>
            </Card>
          </>
        )}
      </div>
      <DashboardTieringSection />
    </>
  );
}