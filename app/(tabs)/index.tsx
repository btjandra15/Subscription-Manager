import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

type SubscriptionDetailProps = {
  name: string;
  cost: string;
  icon: string; // This can be a string representing an icon or logo
};

const SubscriptionDetail = ({ name, cost, icon }: SubscriptionDetailProps) => {
  return(
    <TouchableOpacity className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-3">
      <View className="w-12 h-12 rounded-full bg-gray-700 justify-center items-center mr-4">
        <Text className="text-white text-xl font-bold">{icon}</Text> {/* Apple TV Logo */}
      </View>
        
      <View className="flex-1">
        <Text className="text-white text-lg font-bold">{name}</Text>
        <Text className="text-gray-400 text-sm">{cost}</Text>
      </View>
        
      <TouchableOpacity className="bg-blue-600 w-10 h-10 rounded-full justify-center items-center"></TouchableOpacity>
      </TouchableOpacity>
  )
}

const BillItem = ({ name, cost, icon }: SubscriptionDetailProps) => {
  return (
    <TouchableOpacity className="bg-gray-800 p-4 rounded-xl w-40 items-center">
      <View className="w-10 h-10 rounded-full bg-gray-700 justify-center items-center mb-2">
        <Text className="text-white text-lg font-bold">{icon}</Text> {/* Placeholder for Icon */}
      </View>
      <Text className="text-white text-lg font-bold mb-1">{cost}</Text>
      <Text className="text-gray-400 text-xs">{name}</Text>
    </TouchableOpacity>
  )
}

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mt-10 mb-5">
          {/* <Image source={icons.profile}/> */}
          <Text className="text-white text-2xl font-bold">Hello, Brandon!</Text>
        </View>

        {/* Balance Section */}
        <View className="bg-gray-800 p-5 rounded-xl mb-6">
          <Text className="text-gray-400 text-sm mb-1">Your balance</Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-white text-4xl font-bold">$568.87</Text>
            
            <View className="flex-row items-center space-x-2 bg-gray-700 rounded-full px-3 py-1">
              <Text className="text-gray-300 text-xs">06/30</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Bill Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-xl font-bold">Upcoming Bill</Text>
            <TouchableOpacity>
              <Text className="text-blue-400 text-sm" onPress={() => router.push('/bill')}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            <BillItem name="Spotify" cost="$18.00" icon="S" />
            <BillItem name="Netflix" cost="$21.00" icon="N" />
            <BillItem name="Apple TV" cost="$18.00" icon="A" />
          </ScrollView>
        </View>

        {/* Subscriptions Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-xl font-bold">Subscriptions</Text>
            <TouchableOpacity>
              <Text className="text-blue-400 text-sm" onPress={() => router.push('/subscriptions')}>View All</Text>
            </TouchableOpacity>
          </View>

          <SubscriptionDetail name="Apple TV" cost="$18.00/monthly" icon="A"/>
          <SubscriptionDetail name="Netflix" cost="$21.00/monthly" icon="N"/>
          <SubscriptionDetail name="Spotify" cost="$18.00/monthly"icon="S" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}