const flights = require('../repository/flightList');
const fs = require('fs');

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: (req, res) => {
    // TODO:
    const { departure_times, arrival_times, destination, departure } = req.query;

    const filtered = flights.filter(flight => {
      return (
        (!departure_times || flight.departure_times === departure_times) &&
        (!arrival_times || flight.arrival_times === arrival_times) &&
        (!destination || flight.destination === destination) &&
        (!departure || flight.departure === departure)
      );
    });
    return res.status(200).json(filtered);
  },
  // [GET] /flight/:id
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    const { id } = req.params;

    const flight = flights.find(f => f.uuid === id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    return res.status(200).json([flight]);
  },

  // [PUT] /flight/:id 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    let data;
    // TODO:

    const { id } = req.params;
    updateData = req.body;

    const index = flights.findIndex(f => f.uuid === id);

    data = flights[index];

    if (index === -1) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    data = {
      ...data,
      ...updateData,
    };

    return res.status(200).json(data);

  },
};
