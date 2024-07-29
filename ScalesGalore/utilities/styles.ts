import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "JosefinSans_400Regular"
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 8,
      elevation: 4,
    },
    background: {
      flex: 1,
      resizeMode: "cover"
    },
    homeButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "transparent"
    },
    inner: {
      alignItems: "center",
      justifyContent: "center"
    }
});

export const dropdownStyles = StyleSheet.create({
    dropdown: {
      margin: 16,
      width: 200,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
  });