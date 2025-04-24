"use client"

import { useState, useEffect } from "react"
import { Award, Gift, Clock, Check } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function LoyaltyRewardsPage() {
  // Theme handling from DashboardHeader
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock loyalty data
  const [loyaltyData, setLoyaltyData] = useState({
    points: 1250,
    tier: "Silver",
    nextTier: "Gold",
    pointsToNextTier: 750,
    history: [
      { id: 1, action: "Purchase", points: 150, date: "April 15, 2023" },
      { id: 2, action: "Review Submitted", points: 50, date: "April 10, 2023" },
      { id: 3, action: "Birthday Bonus", points: 100, date: "March 28, 2023" },
      { id: 4, action: "Purchase", points: 200, date: "March 15, 2023" },
    ],
  })

  // Mock rewards
  const [rewards, setRewards] = useState([
    {
      id: 1,
      title: "$10 Off Coupon",
      description: "Get $10 off on your next purchase",
      pointsCost: 500,
      image: "/placeholder.svg?height=80&width=80",
      isAvailable: true,
    },
    {
      id: 2,
      title: "Free Shipping",
      description: "Free shipping on your next order",
      pointsCost: 300,
      image: "/placeholder.svg?height=80&width=80",
      isAvailable: true,
    },
    {
      id: 3,
      title: "Exclusive Product Access",
      description: "Early access to our new collection",
      pointsCost: 1000,
      image: "/placeholder.svg?height=80&width=80",
      isAvailable: true,
    },
    {
      id: 4,
      title: "Premium Membership",
      description: "1 month of premium membership benefits",
      pointsCost: 2000,
      image: "/placeholder.svg?height=80&width=80",
      isAvailable: false,
    },
  ])

  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward)
    setIsRedeemModalOpen(true)
  }

  const handleRedeemConfirm = () => {
    // In a real app, you would call an API to redeem the reward
    setLoyaltyData({
      ...loyaltyData,
      points: loyaltyData.points - selectedReward.pointsCost,
      history: [
        {
          id: loyaltyData.history.length + 1,
          action: `Redeemed ${selectedReward.title}`,
          points: -selectedReward.pointsCost,
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        },
        ...loyaltyData.history,
      ],
    })
    setIsRedeemModalOpen(false)
  }

  // Calculate progress percentage
  const totalPointsForNextTier = loyaltyData.pointsToNextTier + loyaltyData.points
  const progressPercentage = (loyaltyData.points / totalPointsForNextTier) * 100

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Points Summary Card */}
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-foreground">Loyalty & Rewards</h2>
              <p className="text-muted-foreground">Earn points with every purchase and redeem exclusive rewards</p>
            </div>
            <div className="flex items-center bg-primary/10 text-primary rounded-lg px-4 py-2">
              <Award size={20} className="mr-2" />
              <span className="font-semibold">{loyaltyData.tier} Member</span>
            </div>
          </div>

          <div className="mt-6 bg-muted rounded-lg p-6 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-muted-foreground mb-1">Available Points</div>
                <div className="text-3xl font-bold text-foreground">{loyaltyData.points}</div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1 text-foreground">
                  <span>{loyaltyData.tier}</span>
                  <span>{loyaltyData.nextTier}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {loyaltyData.pointsToNextTier} more points to reach {loyaltyData.nextTier}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Available Rewards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`border rounded-lg overflow-hidden transition-all ${reward.isAvailable && loyaltyData.points >= reward.pointsCost
                  ? "border-border hover:border-primary hover:shadow-md"
                  : "border-border opacity-70"
                  }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-center h-16 mb-3">
                    <div className="relative w-full h-auto max-h-full">
                      <Image
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.title}
                        width={500} // Set an appropriate width
                        height={300} // Set an appropriate height
                        className="max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="font-medium text-center mb-1 text-foreground">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-3">{reward.description}</p>
                  <div className="flex justify-center items-center mb-3">
                    <Award size={16} className="text-primary mr-1" />
                    <span className="font-semibold text-foreground">{reward.pointsCost} points</span>
                  </div>
                  <button
                    onClick={() => handleRedeemClick(reward)}
                    disabled={!reward.isAvailable || loyaltyData.points < reward.pointsCost}
                    className={`w-full py-2 rounded-lg flex items-center justify-center transition-colors ${reward.isAvailable && loyaltyData.points >= reward.pointsCost
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                  >
                    {reward.isAvailable && loyaltyData.points >= reward.pointsCost ? (
                      <>
                        <Gift size={16} className="mr-1" />
                        Redeem Now
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="mr-1" />
                        {!reward.isAvailable ? "Not Available" : "Not Enough Points"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points History */}
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Points History</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-muted">
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Activity</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Points</th>
                </tr>
              </thead>
              <tbody>
                {loyaltyData.history.map((item) => (
                  <tr key={item.id} className="border-b border-muted/50">
                    <td className="py-3 px-4 text-foreground">{item.action}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.date}</td>
                    <td
                      className={`py-3 px-4 text-right font-medium ${item.points >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                        }`}
                    >
                      {item.points >= 0 ? `+${item.points}` : item.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Redeem Modal */}
      {isRedeemModalOpen && selectedReward && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in border border-border transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Redeem Reward</h3>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mr-4 transition-colors duration-300">
                <div className="relative w-full h-auto max-h-full max-w-full">
                  <Image
                    src={selectedReward.image || "/placeholder.svg"}
                    alt={selectedReward.title}
                    width={500} // Adjust width based on your layout
                    height={300} // Adjust height based on your layout
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">{selectedReward.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                <div className="flex items-center mt-1 text-primary">
                  <Award size={14} className="mr-1" />
                  <span className="font-medium">{selectedReward.pointsCost} points</span>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3 mb-4 transition-colors duration-300">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Your current points:</span>
                <span className="font-medium text-foreground">{loyaltyData.points}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-muted-foreground">Points to redeem:</span>
                <span className="font-medium text-red-600 dark:text-red-500">-{selectedReward.pointsCost}</span>
              </div>
              <div className="border-t border-muted-foreground/20 mt-2 pt-2 flex justify-between items-center">
                <span className="font-medium text-foreground">Remaining points:</span>
                <span className="font-medium text-foreground">{loyaltyData.points - selectedReward.pointsCost}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsRedeemModalOpen(false)}
                className="px-4 py-2 border border-input rounded-lg bg-background hover:bg-accent text-foreground transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRedeemConfirm}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                <Check size={16} className="mr-1" />
                Confirm Redemption
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}