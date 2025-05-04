# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Setting up Ollama

This project integrates with [Ollama](https://ollama.ai) for AI-powered story generation. Follow these steps to set up Ollama:

1. **Install Ollama**  
   Download and install Ollama from [https://ollama.ai](https://ollama.ai).

2. **Start the Ollama API**  
   Run the Ollama API server locally:
   ```bash
   ollama serve
   ```

3. **Verify the API**  
   Ensure the API is running by visiting [http://localhost:11434](http://localhost:11434) in your browser or using a tool like `curl`:
   ```bash
   curl http://localhost:11434
   ```

4. **Configure the Model**  
   Make sure the required model (e.g., `deepseek-r1:1.5b`) is available in Ollama. You can download it using:
   ```bash
   ollama pull deepseek-r1:1.5b
   ```

5. **Generate Stories**  
   The app will use the Ollama API to generate structured stories based on user input.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
