import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Subscription = {
  id: string;
  name: string;
  cost: string; // e.g., "$21.00/monthly"
  billingCycle: string; // e.g., "monthly", "yearly", "weekly"
  nextPaymentDate: string; // e.g., "Due Jun 18, 2025"
  iconInitial: string;
  iconBgColor: string;
  status: 'active' | 'paused' | 'cancelled';
};

const Subscriptions= () => {
  // Dummy data for subscriptions
  const subscriptions: Subscription[] = [
    {
      id: 'sub1',
      name: 'Netflix Standard',
      cost: '$21.00',
      billingCycle: 'monthly',
      nextPaymentDate: 'Due Jun 18, 2025',
      iconInitial: 'N',
      iconBgColor: '#E50914', // Netflix red
      status: 'active',
    },
    {
      id: 'sub2',
      name: 'Spotify Premium',
      cost: '$18.00',
      billingCycle: 'monthly',
      nextPaymentDate: 'Due Jun 25, 2025',
      iconInitial: 'S',
      iconBgColor: '#1DB954', // Spotify green
      status: 'active',
    },
    {
      id: 'sub3',
      name: 'Apple TV+',
      cost: '$18.00',
      billingCycle: 'monthly',
      nextPaymentDate: 'Due Jun 30, 2025',
      iconInitial: 'A',
      iconBgColor: '#A2AAAD', // Apple grey
      status: 'active',
    },
    {
      id: 'sub4',
      name: 'Adobe Creative Cloud',
      cost: '$52.99',
      billingCycle: 'monthly',
      nextPaymentDate: 'Due Jul 1, 2025',
      iconInitial: 'C',
      iconBgColor: '#FF0000', // Adobe red
      status: 'active',
    },
    {
      id: 'sub5',
      name: 'Xbox Game Pass',
      cost: '$16.99',
      billingCycle: 'monthly',
      nextPaymentDate: 'Due Jul 8, 2025',
      iconInitial: 'X',
      iconBgColor: '#107C10', // Xbox green
      status: 'active',
    },
    {
      id: 'sub6',
      name: 'Google One',
      cost: '$1.99',
      billingCycle: 'monthly',
      nextPaymentDate: 'Due Jul 10, 2025',
      iconInitial: 'G',
      iconBgColor: '#4285F4', // Google blue
      status: 'active',
    },
    // Add more subscriptions as needed
  ];

  // Inline component for a single subscription item, as per your example style
  const SubscriptionItem = ({ subscription }: { subscription: Subscription }) => {
    // These functions would typically interact with navigation or state management
    const handleAddPress = () => {
      console.log(`Add button pressed for: ${subscription.name}`);
      // Example: Implement logic to add/manage subscription
    };

    const handleItemPress = () => {
      console.log(`Item pressed: ${subscription.name}`);
      // Example: navigation.navigate('SubscriptionDetail', { subId: subscription.id });
    };

    return (
      <TouchableOpacity className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-3" onPress={handleItemPress}>
        <View className="w-12 h-12 rounded-full justify-center items-center mr-4" style={{ backgroundColor: subscription.iconBgColor }}>
          <Text className="text-white text-xl font-bold">{subscription.iconInitial}</Text>
        </View>

        {/* Subscription Details */}
        <View className="flex-1">
          <Text className="text-white text-lg font-bold">{subscription.name}</Text>
          <Text className="text-gray-400 text-sm">{subscription.cost} • {subscription.nextPaymentDate}</Text>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          className="bg-blue-600 w-10 h-10 rounded-full justify-center items-center"
          onPress={handleAddPress}
        >
          <FontAwesome name="plus" size={16} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 p-4 mt-5">
        {/* Header Section */}
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Subscriptions</Text>
          
          <TouchableOpacity className="bg-blue-600 w-10 h-10 rounded-full justify-center items-center">
            <FontAwesome name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Informative Text */}
        <Text className="text-gray-500 text-base mb-4">
          Manage all your subscriptions in one place.
        </Text>

        {/* List of Subscriptions */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {subscriptions.map((sub) => (
            <SubscriptionItem key={sub.id} subscription={sub} />
          ))}
          <View className="h-10" /> {/* Add some padding at the bottom for scroll comfort */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Export the component as default, consistent with your example
export default Subscriptions;
