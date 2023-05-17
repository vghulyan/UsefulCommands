function solution(S, K) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Find the index of the given day in the daysOfWeek array
  const currentIndex = daysOfWeek.indexOf(S);

  // Calculate the future day index by adding K to the current index
  const futureIndex = (currentIndex + K) % 7;

  // Return the corresponding day from the daysOfWeek array
  return daysOfWeek[futureIndex];
}
