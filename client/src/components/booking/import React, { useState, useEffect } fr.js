const fetchDates = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "availableDates"))
    const dates = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        date: data.date, // Keep as ISO string
      }
    })
    setAvailableDates(dates)
    console.log("Fetched available dates:", dates)
  } catch (error) {
    console.error("Error fetching available dates:", error)
  }
}
