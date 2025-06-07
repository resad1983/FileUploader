const GAS_URL = 'https://script.google.com/macros/s/AKfycbxjtvSIDRnzxRot1wyPY6VWc6ALluEIIVAx-nZkvwSsCqo_26VLGVRMxnfxNX4M6whLQg/exec'; // ← 替換這裡

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const file = document.getElementById('fileInput').files[0];
  const userName = document.getElementById('userName').value;

  if (!file || !userName) {
    alert('請輸入姓名並選擇檔案');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async function () {
    const base64Data = reader.result.split(',')[1];
    const payload = {
      userName,
      fileName: file.name,
      mimeType: file.type,
      fileBase64: base64Data
    };

    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await res.json();
    document.getElementById('responseMsg').innerText = result.message;
  };

  reader.readAsDataURL(file);
});