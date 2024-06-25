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
  const apiUrl = process.env.NEXT_PUBLIC_PDF_PATH;

  const response = await fetch(apiUrl + "/generate-pdf", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
