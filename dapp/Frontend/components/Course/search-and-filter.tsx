"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"
import { Slider } from "../../components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../../components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

interface SearchAndFilterProps {
  searchQuery: string
  selectedCategory: string
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
}

export default function SearchAndFilter({
  searchQuery,
  selectedCategory,
  onSearch,
  onCategoryChange,
}: SearchAndFilterProps) {
  const [activeFilters, setActiveFilters] = useState(0)
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [durationRange, setDurationRange] = useState([0, 10])
  const [sortBy, setSortBy] = useState("popular")

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const applyFilters = () => {
    // In a real app, you would pass these filters up to the parent component
    // For now, we'll just count how many filters are active
    let count = 0
    if (selectedLevels.length > 0) count++
    if (durationRange[0] > 0 || durationRange[1] < 10) count++
    if (sortBy !== "popular") count++

    setActiveFilters(count)
  }

  const clearAllFilters = () => {
    setSelectedLevels([])
    setDurationRange([0, 10])
    setSortBy("popular")
    setActiveFilters(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for courses..."
            className="pl-10 bg-gray-900 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" className="relative bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-purple-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {activeFilters}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-900 border-gray-800 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Filter Courses</SheetTitle>
            </SheetHeader>

            <div className="py-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Level</h3>
                <div className="grid gap-3">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => handleLevelChange(level)}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor={`level-${level}`} className="text-white">
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Duration (weeks)</h3>
                  <span className="text-gray-400">
                    {durationRange[0]} - {durationRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 10]}
                  max={10}
                  step={1}
                  value={durationRange}
                  onValueChange={setDurationRange}
                  className="[&>span]:bg-purple-600"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="duration-asc">Duration (Low to High)</SelectItem>
                    <SelectItem value="duration-desc">Duration (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter className="flex flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={clearAllFilters}
              >
                <X className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <SheetClose asChild>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue={selectedCategory} className="w-full" onValueChange={onCategoryChange}>
        <TabsList className="bg-gray-900 border border-gray-800 p-1 mb-8">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
            All Courses
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-purple-600">
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="smart-contracts" className="data-[state=active]:bg-purple-600">
            Smart Contracts
          </TabsTrigger>
          <TabsTrigger value="web3" className="data-[state=active]:bg-purple-600">
            Web3
          </TabsTrigger>
          <TabsTrigger value="defi" className="data-[state=active]:bg-purple-600">
            DeFi
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence>
        {activeFilters > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="text-purple-300 font-medium">Active filters: {activeFilters}</span>
              <span className="mx-2 text-gray-500">|</span>
              <div className="flex gap-2">
                {selectedLevels.length > 0 && (
                  <Badge className="bg-purple-700 text-white">
                    {selectedLevels.length} Level{selectedLevels.length > 1 ? "s" : ""}
                  </Badge>
                )}
                {(durationRange[0] > 0 || durationRange[1] < 10) && (
                  <Badge className="bg-purple-700 text-white">
                    Duration: {durationRange[0]}-{durationRange[1]} weeks
                  </Badge>
                )}
                {sortBy !== "popular" && (
                  <Badge className="bg-purple-700 text-white">Sorted by: {sortBy.replace("-", " ")}</Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300 hover:text-white hover:bg-purple-800/50"
              onClick={clearAllFilters}
            >
              <X className="h-4 w-4 mr-1" /> Clear all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Import Badge component if not already imported
import { Badge } from "../../components/ui/badge"

