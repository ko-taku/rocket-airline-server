const flights = require('../repository/flightList');
const fs = require('fs');
// 항공편 예약 데이터를 저장합니다.
let booking = [];
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 데이터 혹은 요청 된 flight_uuid, phone 값과 동일한 예약 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    const { flight_uuid, phone } = req.query;

    if (flight_uuid) {
      const filtered = booking.filter(b => b.flight_uuid === flight_uuid);
      return res.status(200).json(filtered);
    }

    if (phone) {
      const found = booking.find(b => b.phone === phone);
      if (found) {
        return res.status(200).json(found);
      }
    }

    return res.status(200).json(booking);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  // 응답으로는 book_id를 리턴합니다.
  // Location Header로 예약 아이디를 함께 보내준다면 RESTful한 응답에 더욱 적합합니다.
  // 참고 링크: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#useful-post-responses
  create: (req, res) => {
    // TODO:
    const data = req.body;
    //const uuid = uuidv4();
    // console.log('유니크 아이디 : ', uuid);

    // const bookingData = { uuid, ...data };
    const bookingData = { ...data };

    booking.push(bookingData);
    // console.log('예약 정보 : ', bookingData);
    return res.status(201).json(data.uuid);
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: (req, res) => {
    // TODO:
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number required' });
    }

    const originalLength = booking.length;
    // phone이 일치하지 않는 예약만 남김
    const remaining = booking.filter(b => b.phone !== phone);

    if (remaining.length === originalLength) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 기존 배열 내용 갱신
    booking.length = 0;
    booking.push(...remaining);

    return res.status(200).json(booking);

  },
};
