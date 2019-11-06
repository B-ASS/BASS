import multiparty from 'multiparty'; // 또는 var multipart = require('multiparty');

// /upload_image POST 요청을 받는 라우터
router.post('/upload_image', (req, res) => {
    let form = new multiparty.Form({
        autoFiles: true,
        uploadDir: "/upload_image",
        maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
    });

    form.parse(req, (error, fields, files) => {
    	// 파일 전송이 요청되면 이곳으로 온다.
        // 에러와 필드 정보, 파일 객체가 넘어온다.


    	res.json('file uploaded'); // 파일과 예외 처리를 한 뒤 브라우저로 응답해준다.
    });
});