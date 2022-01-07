import React from 'react';
import './styles.css';

const About = () => {
  return (
    <div className="service" id="about">
      <div className="service__header">
        <span>About</span>
      </div>
      <div className="service__main">
        <div className="description">
          <span> Vì sao Domino’s Pizza là chuyên gia giao hàng </span>
          Domino's Pizza có hơn 10.000 cửa hàng trên toàn thế giới tại hơn 74
          quốc gia. Chúng tôi mang đến sự hài lòng cho hơn 1 triệu khách hàng
          mỗi ngày, hơn 400 triệu bánh pizza mỗi năm. Trong suốt 50 năm qua, lời
          hứa “giao hàng miễn phí trong 30 phút” của chúng tôi đã trở thành một
          quy chuẩn.
        </div>
        <div className="image">
          <img src="https://dominos.vn/img/about-us-delivery.png" alt="" />
        </div>
      </div>
      <div className="service__main">
        <div className="description">
          <span>
            Domino's Pizza đảm bảo rằng đơn đặt hàng của bạn sẽ đến trong vòng
            30 phút
          </span>
          hoặc chúng tôi sẽ gửi đến bạn một Voucher miễn phí Pizza cỡ vừa cho
          lần mua tiếp theo!
        </div>

        <div className="image order">
          <img src="https://dominos.vn/img/about-us-commitment.png" alt="" />
        </div>
      </div>
      <div className="service__main">
        <div className="description">
          <span>Điều kiện áp dụng: </span>
          Tình trạng trên áp dụng khi sai/thiếu đủ lớp phủ hoặc không thêm phụ
          gia như đã đặt hàng. Domino's Pizza sẽ thay thế đơn đặt hàng hoặc gửi
          tặng Voucher miễn phí Pizza cỡ vừa (9 ") cho lần mua tiếp theo.
          Domino's Pizza có quyền rút lại dịch vụ mà không cần thông báo trước.
          Điều này sẽ không áp dụng trong điều kiện thời tiết bất thường hoặc
          xấu như mưa to, lũ lụt, bão, thủy triều ...
        </div>
        <div className="image">
          <img src="https://dominos.vn/img/about-us-condition.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
