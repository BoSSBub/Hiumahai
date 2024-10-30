import React from 'react';

const mockReviews = [
  {
    id: 1,
    text: "ส่งของเร็วมากกกค่า ทันใจสุดๆ สั่งหัวไปวันอาทิตย์ วันอังคารได้แล้ว พ่อค้าน่ารักมากก",
    rating: 5,
    date: "4 ต.ค. 2567"
  },
  {
    id: 2,
    text: "ฝากหัวกับพี่คนนี้ครั้งแรก ประทับใจมากๆ ส่งไวสุดๆ",
    rating: 5,
    date: "6 ต.ค. 2567"
  },
  {
    id: 3,
    text: "ค่าหัวไม่แพง ส่งไวติดจรวด",
    rating: 5,
    date: "7 ต.ค. 2567"
  }
];

function Reviews() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fffff' }}>
      {mockReviews.map(review => (
        <div key={review.id} style={{
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '10px',
          maxWidth: '400px',
          marginLeft : 370,
        }}>
          <p style={{ margin: 0 }}>{review.text}</p>
          <div style={{ color: '#FFD700', marginTop: '5px' }}>
            {'★'.repeat(review.rating)}
          </div>
          <p style={{ fontSize: '12px', color: '#888', textAlign: 'right', margin: 0 }}>{review.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
