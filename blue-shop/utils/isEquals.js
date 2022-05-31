// Hàm kiểm tra một giá trị là object
const isObject = (obj) => {
    return obj != null && typeof obj === "object";
}
  
  // Hàm so sánh sâu
export const isDeepEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1); // trả về mảng các thuộc tính của obj1
    const keys2 = Object.keys(obj2); // trả về mảng các thuộc tính của obj2
  
    // nếu số lượng keys khác nhau thì chắc chắn khác nhau
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
  
      // kiểm tra xem hai giá trị có cùng là object hay không
      const areObjects = isObject(val1) && isObject(val2);
  
      // nếu cùng là object thì phải gọi đệ quy để so sánh 2 object
      if (areObjects && !isDeepEqual(val1, val2)) {
        return false;
      }
  
      // nếu không cùng là object thì so sánh giá trị
      if (!areObjects && val1 !== val2) {
        return false;
      }
    }
  
    return true;
  }