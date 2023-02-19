function Home() {
  return (
    <div>
      <h1 style={{ color: '#03a9f4' }}>S3 - CloudFront 연동 테스트</h1>
      <ul>
        <li>S3 버켓 생성</li>
        <li>CloudFront 생성</li>
        <li>S3 접근 권한 private 설정</li>
        <li style={{ color: '#ff1493', fontWeight: 700 }}>cloudFront 워본 설정 중, S3 버킷 액세스 설정 - 원본 액세스 제어 설정으로 변경</li>
        <li style={{ color: '#ff1493', fontWeight: 700 }}>S3 에 접근 정책 변경 - CloudFront 를 통해서는 접근할 수 있도록 수정하는 작업</li>
      </ul>
    </div>
  );
}

export default Home;
