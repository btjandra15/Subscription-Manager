import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

type SubscriptionDetailProps = {
  name: string;
  cost: string;
  due_date: string;
  icon: string;
};

type TabType = 'Weekly' | 'Monthly' | 'Yearly';

const SubscriptionDetail = ({ name, cost, due_date, icon }: SubscriptionDetailProps) => {
  return (
    <TouchableOpacity className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-3">
      <View className="w-12 h-12 rounded-full bg-gray-700 justify-center items-center mr-4">
        <Text className="text-white text-xl font-bold">{icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-white text-lg font-bold">{name}</Text>
        <Text className="text-gray-400 text-sm mb-1">{due_date}</Text>
        <Text className="text-gray-400 text-sm">{cost}</Text>
      </View>

      <TouchableOpacity className="bg-blue-600 w-10 h-10 rounded-full justify-center items-center">
        <FontAwesome name="edit" size={16} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const BillItem = ({ name, cost, due_date, icon }: SubscriptionDetailProps) => {
  return (
    <TouchableOpacity className="bg-gray-800 p-4 rounded-xl w-40 items-center pl-2 mr-2">
      <View className="w-10 h-10 rounded-full bg-gray-700 justify-center items-center mb-2">
        <Text className="text-white text-lg font-bold">{icon}</Text>
      </View>

      <Text className="text-gray-400 text-sm mb-1">{due_date}</Text>
      <Text className="text-white text-lg font-bold mb-1">{cost}</Text>
      <Text className="text-gray-400 text-xs">{name}</Text>
    </TouchableOpacity>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>("Monthly");
  const [modalVisible, setModalVisible] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const tabs: TabType[] = ["Weekly", "Monthly", "Yearly"];
  const router = useRouter();

  const balanceMap: Record<TabType, string> = {
    Weekly: "$14.25",
    Monthly: "$57",
    Yearly: "$684"
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowPicker(Platform.OS === 'ios'); // keep open on iOS, close on Android
    setDueDate(currentDate);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  useEffect(() => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 relative">
        <ScrollView className="p-4">
          {/* Header Section */}
          <View className="flex-row justify-between items-center mt-10 mb-5">
            <Text className="text-white text-2xl font-bold">Hello, Brandon!</Text>
          </View>

          {/* Balance Section */}
          <View className="bg-gray-800 p-5 rounded-xl mb-6">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-gray-400 text-sm mb-1">Your balance</Text>

              <View className="flex-row items-center space-x-1">
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-700'}`}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text className={`text-sm ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-white text-4xl font-bold">{balanceMap[activeTab]}</Text>
            </View>
          </View>

          {/* Upcoming Bill Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white text-xl font-bold">Upcoming Bill</Text>
              <TouchableOpacity onPress={() => router.push('/bill')}>
                <Text className="text-blue-400 text-sm">View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
              <BillItem name="Spotify" cost="$18.00" due_date="Due June 30th (19d)" icon="S" />
              <BillItem name="Netflix" cost="$21.00" due_date="Due June 30th (19d)" icon="N" />
              <BillItem name="Apple TV" cost="$18.00" due_date="Due June 30th (19d)" icon="A" />
            </ScrollView>
          </View>

          {/* Subscriptions Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white text-xl font-bold">Subscriptions</Text>
              <TouchableOpacity onPress={() => router.push('/subscriptions')}>
                <Text className="text-blue-400 text-sm">View All</Text>
              </TouchableOpacity>
            </View>

            <SubscriptionDetail name="Apple TV" cost="$18.00/monthly" due_date="Due June 30th (19d)" icon="A" />
            <SubscriptionDetail name="Netflix" cost="$21.00/monthly" due_date="Due June 30th (19d)" icon="N" />
            <SubscriptionDetail name="Spotify" cost="$18.00/monthly" due_date="Due June 30th (19d)" icon="S" />
          </View>
        </ScrollView>

        {/* Floating Add Button */}
        <Animated.View style={{transform: [{ scale: scaleAnimation }],}} className="absolute bottom-28 right-6">
          <TouchableOpacity onPress={handlePress} className="bg-blue-600 w-16 h-16 rounded-full justify-center items-center shadow-lg">
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/70 justify-center items-center px-6">
            <View className="bg-white rounded-2xl w-full p-6 space-y-4">
              <Text className="text-xl font-bold text-center mb-3">Add Subscription</Text>
              <TextInput placeholder="Name" className="border border-gray-300 rounded-lg p-2 mb-3" placeholderTextColor="#888"/>
        
              <TextInput
                placeholder="Cost"
                className="border border-gray-300 rounded-lg p-2 mb-3"
                placeholderTextColor="#888"
                keyboardType="decimal-pad"
              />
        
              <TouchableOpacity onPress={() => setShowPicker(true)} className="border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-700">
                  {dueDate.toDateString()}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker value={dueDate} mode="date" display="default" onChange={onChange}/>
              )}
        
              <TouchableOpacity className="bg-blue-600 py-3 rounded-lg mb-2 mt-3" onPress={() => setModalVisible(false)}>
                <Text className="text-center text-white font-semibold">Save</Text>
              </TouchableOpacity>

              <TouchableOpacity className="mb-2 mt-3" onPress={() => setModalVisible(false)}>
                <Text className="text-center font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)} className="absolute top-4 right-4 z-10">
                <FontAwesome name="close" size={25} color="#aaa" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}