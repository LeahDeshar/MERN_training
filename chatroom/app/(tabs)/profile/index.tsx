import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { AppContext } from "@/hooks/AppProvider";

// export default function ProfileIndex() {
//   const { user, allUsers } = useLocalSearchParams();
//   const [parsedUser, setParsedUser] = React.useState(null);
//   const [parsedUsers, setParsedUsers] = React.useState([]);
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const navigation = useRouter();

//   React.useEffect(() => {
//     try {
//       setParsedUser(JSON.parse(user));
//       const usersData = JSON.parse(allUsers);
//       setParsedUsers(usersData?.users || []);
//     } catch (error) {
//       console.error("Failed to parse user data:", error);
//     }
//   }, [user, allUsers]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Profile</Text>
//       <Text style={styles.text}>
//         Chat with {parsedUser?.user?.role === "coach" ? "trainee" : "coach"}
//       </Text>

//       <Text>Role: {parsedUser?.user?.role}</Text>

//       {parsedUsers.length > 0 && (
//         <View>
//           <Text>Available Users</Text>
//           {/* {parsedUsers.map(
//             (person) =>
//               // Display opposite role only
//               person.role !== parsedUser?.user?.role && (
//                 <Pressable
//                   key={person._id}
//                   onPress={() =>
//                     navigation.navigate({
//                       pathname: "/profile/[params]",
//                       params: {
//                         user: JSON.stringify(parsedUser),
//                         otherUser: JSON.stringify(person),
//                       },
//                     })
//                   }
//                   style={styles.userContainer}
//                 >
//                   <Text>{person.username}</Text>
//                 </Pressable>
//               )
//           )} */}

//           {parsedUsers.map((person) => {
//             const unreadCount = unreadCounts[person._id] || 0; // Get the unread count for this user
//             return (
//               person.role !== parsedUser?.user?.role && (
//                 <Pressable
//                   key={person._id}
//                   onPress={() =>
//                     navigation.navigate({
//                       pathname: "/profile/[params]",
//                       params: {
//                         user: JSON.stringify(parsedUser),
//                         otherUser: JSON.stringify(person),
//                       },
//                     })
//                   }
//                   style={styles.userContainer}
//                 >
//                   <Text>{person.username}</Text>
//                   {unreadCount > 0 && (
//                     <Text style={{}}>+{unreadCount}</Text> // Display unread count
//                   )}
//                 </Pressable>
//               )
//             );
//           })}
//         </View>
//       )}

//       <Link href="/profile/modal" style={styles.link}>
//         Open modal
//       </Link>
//     </View>
//   );
// }

export default function ProfileIndex() {
  const { user, allUsers } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = React.useState(null);
  const [parsedUsers, setParsedUsers] = React.useState([]);
  // const [unreadCounts, setUnreadCounts] = React.useState({});

  const { unreadCounts } = useContext(AppContext);

  const navigation = useRouter();

  React.useEffect(() => {
    try {
      setParsedUser(JSON.parse(user));
      const usersData = JSON.parse(allUsers);
      setParsedUsers(usersData?.users || []);
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }, [user, allUsers]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.text}>
        Chat with {parsedUser?.user?.role === "coach" ? "trainee" : "coach"}
      </Text>

      <Text>Role: {parsedUser?.user?.role}</Text>

      {parsedUsers.length > 0 && (
        <View>
          <Text>Available Users</Text>
          {parsedUsers.map((person) => {
            const unreadCount = unreadCounts[person._id] || 0;
            return (
              person.role !== parsedUser?.user?.role && (
                <Pressable
                  key={person._id}
                  onPress={() =>
                    navigation.navigate({
                      pathname: "/profile/[params]",
                      params: {
                        user: JSON.stringify(parsedUser),
                        otherUser: JSON.stringify(person),
                        unreadCounts, // Pass unreadCounts to ProfileDetails
                      },
                    })
                  }
                  style={styles.userContainer}
                >
                  <Text>{person.username}</Text>
                  {/* {unreadCount > 0 && (
                    <Text style={styles.unreadCount}>+{unreadCount}</Text> // Display unread count
                  )} */}
                </Pressable>
              )
            );
          })}
        </View>
      )}

      <Link href="/profile/modal" style={styles.link}>
        Open modal
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
  },
  text: {
    marginVertical: 10,
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
  userContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
  },
});
