import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
import { getOrderByAdmin } from '../../../action/orderActions';
import { getOutOfStock, getProduct } from '../../../action/productActions';
import { getAllUser } from '../../../action/userActions';
import { LayoutAdmin, Loading } from '../../../components';
import './styles.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  Chart.register(CategoryScale);

  const {
    loading: loadProd,
    products,
    productsCount,
  } = useSelector((state) => state.getProducts);

  const {
    loading: loadOrder,
    ordersCount,
    totalAmount,
  } = useSelector((state) => state.getOrderAdmin);

  const {
    loading: loadStock,
    count: countStock,
    outOfStock,
  } = useSelector((state) => state.stock);

  const { loading: loadUser, usersCount } = useSelector(
    (state) => state.allUser
  );

  const filter = {
    keyword: '',
    currentPage: 1,
    category: '',
    sale: false,
    pageSize: 6,
    order: 'lowest',
  };

  useEffect(() => {
    dispatch(getProduct(filter));
    dispatch(getOrderByAdmin(1, 7));
    dispatch(getAllUser(1, 7));
    dispatch(getOutOfStock());
  }, [dispatch]);

  return (
    <LayoutAdmin>
      {loadOrder || loadProd || loadUser ? (
        <Loading />
      ) : (
        <div className="order__page">
          <div className="header">
            <div>
              <span>Dashboard</span>
            </div>
          </div>
          <div className="card__box">
            <Link to="/admin/products" className="card">
              <div>
                <div className="numbers">{productsCount || 0}</div>
                <div className="cardName">Sản phẩm</div>
              </div>
              <div className="iconBx">
                <i className="bx bxs-pizza"></i>
              </div>
            </Link>
            <Link to="/admin/orders" className="card">
              <div>
                <div className="numbers">{ordersCount || 0}</div>
                <div className="cardName">Đơn hàng</div>
              </div>
              <div className="iconBx">
                <i className="bx bx-package"></i>
              </div>
            </Link>
            <Link to="/admin/account" className="card">
              <div>
                <div className="numbers">{usersCount || 0}</div>
                <div className="cardName">Khách hàng</div>
              </div>
              <div className="iconBx">
                <i className="bx bx-group"></i>
              </div>
            </Link>
            <div className="card">
              <div>
                <div className="numbers">{totalAmount}$</div>
                <div className="cardName">Doanh thu</div>
              </div>
              <div className="iconBx">
                <i className="bx bx-dollar"></i>
              </div>
            </div>
          </div>

          <div className="chart">
            <div className="lineChart">
              <Line
                data={{
                  labels: ['Vốn', 'Doanh thu'],
                  datasets: [
                    {
                      label: 'DOANH THU',
                      backgroundColor: ['blue'],
                      hoverBackgroundColor: ['#0078ae'],
                      data: [0, totalAmount],
                    },
                  ],
                }}
              />
            </div>

            {loadStock ? (
              <Loading />
            ) : (
              <div className="doughnutChart">
                <Doughnut
                  data={{
                    labels: ['HẾT HÀNG', 'CÒN HÀNG'],
                    datasets: [
                      {
                        backgroundColor: ['#e31837', '#0ca3ea'],
                        hoverBackgroundColor: ['#aa1934', '#004666'],

                        data: [outOfStock, countStock],
                      },
                    ],
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Dashboard;
