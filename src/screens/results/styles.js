import material from "../../../native-base-theme/variables/material";

export default {
  container: {
    backgroundColor: "transparent"
  },
  content: {
    padding: 15,
    backgroundColor: "transparent",
    marginTop: 50
  },
  title: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center"
  },
  logo: {
    resizeMode: "contain",
    width: "auto",
    height: 200
  },
  results: {
    backgroundColor: "#fafafa", 
    alignSelf: "center", 
    display: "flex", 
    flexDirection: "row", 
    flex: 0, 
    alignItems: "center", 
    paddingHorizontal: 8, 
    paddingVertical: 4
  },
  resultsHeader: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0,
    backgroundColor: material.brandPrimary
  },
  nextBtn: {
    color: "#fff"
  }
}