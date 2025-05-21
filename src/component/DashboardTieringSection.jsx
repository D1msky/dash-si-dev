import { useState } from 'react';
import { Progress, Typography } from 'antd';
import { Icon } from '@iconify/react';

const { Title, Text } = Typography;

export default function DashboardTieringSection() {
  // Dummy data state for no shipments yet
  const [noShipments] = useState(true);
  
  // Predefined medal image path
  const medalImagePath = "https://storage-indopaket.s3.ap-southeast-1.amazonaws.com/uploads/assets-dev/tiering/tiering-current.avif";
  
  return (
    <div className="bg-white border border-[#d6d6d6] rounded-lg p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={3} className="!mb-0">Level Tiering</Title>
        <a href="/tiering/history" className="text-primary flex items-center no-underline">
          <span className="mr-1">Selengkapnya</span>
          <Icon icon="lucide:chevron-right" />
        </a>
      </div>
      
      {noShipments ? (
        <div className="py-4">
          <div className="flex items-center">
            <img 
              src={medalImagePath}
              alt="Bronze Medal"
              className="h-10 w-10 object-contain mr-3 mt-1"
            />
            <Text strong className="text-2xl">Anda Belum Melakukan Pengiriman</Text>
          </div>
          <Text className="text-gray-600 block ml-[52px]">
            Segera lakukan pengiriman paket dan dapatkan insentif menarik.
          </Text>
        </div>
      ) : (
        <>
          <div style={{
            background: `linear-gradient(to right, #744526, #EEA571)`,
            borderRadius: '8px',
            padding: '1px'
          }} className="mb-6">
            <div className="bg-white p-4 rounded-lg flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img 
                  src={medalImagePath}
                  alt="Bronze Medal"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <Text strong className="text-xl">Bronze</Text>
                  <Text className="text-gray-500 ml-2">
                    (0/2 Paket)
                  </Text>
                </div>
                <div className="mb-2">
                  <Progress 
                    percent={0} 
                    showInfo={false}
                    strokeColor={{
                      '0%': '#744526',
                      '100%': '#EEA571',
                    }}
                    trailColor="#f0f0f0"
                    strokeWidth={10}
                    className="!mb-1"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <Text className="text-gray-600">
                    Periode: May 2025
                  </Text>
                  <Text className="text-gray-600">
                    Insentif: <Text strong className="text-blue-600">IDR 100.000</Text>
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
            <div className="flex items-center">
              <div className="relative mr-3 flex-shrink-0">
                <img 
                  src={medalImagePath}
                  alt="Silver Medal"
                  className="h-12 w-12 object-contain opacity-75 blur-[1px]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon icon="lucide:lock" className="text-lg text-gray-500" />
                </div>
              </div>
              <div>
                <Text className="block">
                  Kirim <Text strong>2 paket lagi</Text> untuk 
                  naik ke level <Text strong>Silver</Text> dan 
                  dapatkan insentif <Text strong>IDR 200.000</Text>
                </Text>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}