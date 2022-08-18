function slugify(text) {
  return (
    text
      .toString()
      .toLowerCase()

      // xóa dấu

      .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu sau khi tách tổ hợp

      // Thay ký tự đĐ
      .replace(/[đĐ]/g, "d")

      // Xóa ký tự đặc biệt
      .replace(/([^0-9a-z-\s])/g, "")

      // Xóa khoảng trắng thay bằng ký tự -
      .replace(/(\s+)/g, "-")

      // Xóa ký tự - liên tiếp
      .replace(/-+/g, "-")

      // xóa phần dư - ở đầu & cuối
      .replace(/^-+|-+$/g, "")

    //   .toLowerCase()
    //   .replace(/\s+/g, "-") // Replace spaces with -
    //   // .replace(/[^\w\-\.]+/g, "") // Remove all non-word chars
    //   .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
    //   .replace(/\-\-+/g, "-") // Replace multiple - with single -
    //   .replace(/^-+/, "") // Trim - from start of text
    //   .replace(/-+$/, "")
    // Trim - from end of text
  );
}

module.exports = slugify;
