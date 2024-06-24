import { jwtVerify } from "jose";

const getQuery = (searchFields, searchValue = "") => {
  const query = {
    $or: [],
  };

  searchFields.forEach((field) => {
    const fieldQuery = {
      [field]: {
        $regex: searchValue,
        $options: "i",
      },
    };

    query.$or.push(fieldQuery);
  });

  return query;
};

const downloadPDF = async (data = {}) => {
  const response = await fetch("/api/generate-html", {
    body: JSON.stringify(data),
    method: "post",
  });
  const name = data?.name
    ?.replace(/\s+/g, " ")
    .replace(/ /g, "-")
    .toLowerCase();
  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${name}.pdf`;
  link.click();
};

const getDataFromToken = async (token) => {
  try {
    const decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.TOKEN_SECRET),
    )
      .then((res) => res?.payload || {})
      .catch(() => {});

    return { ...decodedToken };
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};
export { getQuery, downloadPDF, getDataFromToken };
