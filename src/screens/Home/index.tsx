import { useEffect, useState } from "react";
import { Image, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("Game", { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch("http://192.168.15.177:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={logoImg} style={styles.logo} />
          <Heading
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
            renderItem={({ item }) => (
              <GameCard data={item} onPress={() => handleOpenGame(item)} />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
