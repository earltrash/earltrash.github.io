// 팀원별 파일 리스트 (파일 추가/삭제시 이 부분만 수정)
const fileList = {
  "HJ": [
    { name: "투영", path: "data/HJ/투영.md" },
  ],
  "Euni": [
    { name: "C++ Compiler", path: "data/Euni/C++Compiler.md" }
  ],
  "BJ": [
    { name: "COM", path: "data/BJ/COM.md" },
  ],
};

function showList(member) {
  const section = document.getElementById('file-list-section');
  const files = fileList[member];
  if (!files) {
    section.innerHTML = '<h2>자료가 없습니다.</h2>';
    return;
  }
  let html = `<h2>${member}의 자료 목록</h2><ul>`;
  files.forEach((file, idx) => {
    html += `<li><a href="#" onclick="showFile('${member}', ${idx}); return false;">${file.name}</a></li>`;
  });
  html += '</ul>';
  section.innerHTML = html;

  // 목록 보이기, 내용 숨기기
  section.style.display = '';
  document.getElementById('file-content-section').style.display = 'none';
}

function showFile(member, idx) {
  const file = fileList[member][idx];
  fetch(file.path)
    .then(res => {
      if (!res.ok) throw new Error('파일을 불러올 수 없습니다.');
      return res.text();
    })
    .then(md => {
      document.getElementById('file-content').innerHTML = marked.parse(md);
      document.getElementById('file-list-section').style.display = 'none';
      document.getElementById('file-content-section').style.display = '';
    })
    .catch(err => {
      document.getElementById('file-content').innerHTML = '<p>파일을 불러올 수 없습니다.</p>';
      document.getElementById('file-list-section').style.display = 'none';
      document.getElementById('file-content-section').style.display = '';
    });
}

function backToList() {
  document.getElementById('file-content-section').style.display = 'none';
  document.getElementById('file-list-section').style.display = '';
}
