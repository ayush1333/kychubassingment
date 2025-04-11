// // src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';

// const { Header, Content } = Layout;

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Header style={{ color: '#fff', fontSize: 20 }}>Credit Risk Dashboard</Header>
//         <Content style={{ padding: '20px' }}>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//           </Routes>
//         </Content>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

import { Layout, Switch, Typography } from 'antd';
import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
       <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: darkMode ? '#141414' : '#fff',
            paddingInline: 20,
          }}
        >
          <Title level={4} style={{ margin: 0, color: darkMode ? '#fff' : '#000' }}>
            Credit Risk Dashboard
          </Title>
          <div>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
        </Header>

        <Content style={{ padding: 24 }}>
        <Routes>
         <Route path="/" element={<Dashboard />} />
/       </Routes>
        </Content>
      </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;

