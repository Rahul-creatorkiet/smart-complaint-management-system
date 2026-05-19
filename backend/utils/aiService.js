const analyzeComplaint = async (title, description, category) => {
  const text = `${title} ${description} ${category}`.toLowerCase();

  let priority = "Medium";
  let department = "General Department";

  if (
    text.includes("electric") ||
    text.includes("spark") ||
    text.includes("fire")
  ) {
    priority = "High";
    department = "Electricity Department";
  } else if (
    text.includes("water") ||
    text.includes("leak") ||
    text.includes("pipeline")
  ) {
    priority = "Medium";
    department = "Water Supply Department";
  } else if (
    text.includes("garbage") ||
    text.includes("waste") ||
    text.includes("clean")
  ) {
    priority = "Low";
    department = "Sanitation Department";
  }

  const summary = description.length > 100
    ? description.substring(0, 100) + "..."
    : description;

  const autoResponse =
    `Your complaint has been registered successfully. ` +
    `It has been marked as ${priority} priority and forwarded to ${department}.`;

  return {
    priority,
    department,
    summary,
    autoResponse
  };
};

module.exports = analyzeComplaint;