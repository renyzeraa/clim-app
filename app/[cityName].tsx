import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface City {
    temp: number
    date: string
    time: string
    condition_code: string
    description: string
    currently: string
    cid: string
    city: string
    img_id: string
    humidity: number
    cloudiness: number
    rain: number
    wind_speedy: string
    wind_direction: number
    wind_cardinal: string
    sunrise: string
    sunset: string
    moon_phase: string
    condition_slug: string
    city_name: string
    timezone: string
    forecast: Forecast[]
}

interface Forecast {
    date: string
    weekday: string
    max: number
    min: number
    humidity: number
    cloudiness: number
    rain: number
    rain_probability: number
    wind_speedy: string
    sunrise: string
    sunset: string
    moon_phase: string
    description: string
    condition: string
}

export default function CityDetails() {
    const router = useRouter()
    const { cityName } = useLocalSearchParams()
    const [cityDetails, setCityDetails] = useState<City | null>(null)

    const handleData = useCallback(async () => {
        try {
            const response = await fetch("https://climapp-api.vercel.app/api");
            const responseJSON: City[] = await response.json();

            const city = responseJSON.find(item => item && item.city === cityName);
            setCityDetails(city ?? null);
        } catch (e) {
            console.error(e);
        }
    }, [cityName]);

    useEffect(() => {
        handleData()
    }, [handleData]);

    return (
        <LinearGradient colors={["#00457d", "#05051f"]} style={style.container}>
            <View>
                <TouchableOpacity onPress={() => router.back()} style={style.headerIcon}>
                    <MaterialIcons
                        name="chevron-left"
                        size={24}
                        color={"#fff"}
                    />
                </TouchableOpacity>
                {cityDetails && <Text style={style.headerTitle}>{cityDetails.city}</Text>}
            </View>

            <View style={style.card}>
                <View style={style.cardHeader}>
                    <Text style={style.cardHeaderTitle}>Hoje</Text>
                    {cityDetails && <Text style={style.cardHeaderTitle}>{cityDetails.date}</Text>}
                </View>

                <View style={style.cardBox}>
                    <Image
                        source={require("@/assets/images/clouds.png")}
                        style={style.cardImage}
                    />

                    {cityDetails && <View>
                        <Text style={style.cardTemperature}>{cityDetails.temp}°</Text>
                        <Text style={style.cardDescription}>{cityDetails.description}</Text>
                    </View>}
                </View>

                <View style={style.rowBox}>
                    <View style={style.row}>
                        <Image source={require("@/assets/icons/humidity.png")} />

                        <Text style={style.rowTitle}>Humidity:</Text>

                        {cityDetails && <Text style={style.rowValue}>{cityDetails.humidity}%</Text>}
                    </View>

                    <View style={style.row}>
                        <Image source={require("@/assets/icons/temperature.png")} />

                        <Text style={style.rowTitle}>Min/Max:</Text>

                        {cityDetails && <Text style={style.rowValue}>
                            {cityDetails.forecast[0].min}/{cityDetails.forecast[0].max}
                        </Text>}
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                {cityDetails?.forecast.slice(0, 3).map(({ weekday, date, min, max }) => (
                    <View style={style.cardForecast} key={date}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={style.cardForecastText}>{weekday}</Text>
                            <Text style={style.cardForecastText}>{`(${date})`}</Text>
                        </View>
                        <Image style={{ width: 24, height: 24 }} source={require('@/assets/images/clouds.png')} />
                        <Text style={style.cardForecastTextWeather}>{min}/{max}°</Text>
                    </View>
                ))}
            </View>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    cardForecastTextWeather: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    cardForecastText: {
        color: '#fff',
        fontSize: 16
    },
    cardForecast: {
        borderRadius: 24,
        backgroundColor: "#4D5E6F",
        padding: 16,
        gap: 16,
        alignItems: 'center',
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 60,
        gap: 40,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Montserrat_600SemiBold",
        textAlign: "center",
    },
    card: {
        width: "100%",
        borderRadius: 24,
        backgroundColor: "#4463D5",
        padding: 16,
        gap: 24,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    cardHeaderTitle: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_600SemiBold",
    },
    headerIcon: {
        position: "absolute",
        left: 0,
        zIndex: 10
    },
    cardImage: {
        width: 72,
        height: 64,
    },
    cardTemperature: {
        color: "#fff",
        fontSize: 43,
        fontFamily: "Montserrat_700Bold",
        textAlign: "center",
    },
    cardDescription: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
    },
    cardBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rowTitle: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_600SemiBold",
    },
    rowValue: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        marginLeft: "auto",
    },
    rowBox: {
        gap: 8,
    },
})