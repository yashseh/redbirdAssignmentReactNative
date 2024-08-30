import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoryHomeCard from './CategoryHomeCard';
import {ICategory} from '@state/slices/products/types';
import {mockCategories} from '@adapters/mockData';

type IHomeCategoriesViewProps = {
  categories: ICategory[];
  selectedCategoryIndex: number;
  isLoading: boolean;
  getSelectedCategoryIndex: (categoryIndex: number) => void;
};

const HomeCategoriesView: React.FC<IHomeCategoriesViewProps> = ({
  categories,
  isLoading,
  selectedCategoryIndex,
  getSelectedCategoryIndex,
}) => {
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(
    selectedCategoryIndex,
  );
  const [productCategories, setProductCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCurrentSelectedCategory(selectedCategoryIndex);
  }, [selectedCategoryIndex]);

  useEffect(() => {
    if (isLoading) {
      setProductCategories(mockCategories);
    } else {
      setProductCategories(categories);
    }
  }, [isLoading]);

  const onPressCategory = (categoryIndex: number) => {
    setCurrentSelectedCategory(categoryIndex);
    getSelectedCategoryIndex(categoryIndex);
  };
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View style={styles.categoryList}>
        {productCategories.map((category, index) => (
          <CategoryHomeCard
            key={category?.id}
            categoryName={category?.name}
            categoryBanner={category?.banner}
            onPressCategory={() => onPressCategory(index)}
            isSelected={index === currentSelectedCategory}
            isLoading={isLoading}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeCategoriesView;

const styles = StyleSheet.create({
  categoryList: {flexDirection: 'row', gap: 24},
});
