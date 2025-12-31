import Link from "next/link";

import { Upload, Brain, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import GetStarted from "@/components/ui/GetStarted";
import { StartTestButton } from "@/components/ui/StartTestButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform PDFs into
            <span className="text-blue-600"> Interactive Mock Tests</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your study materials and let our AI convert them into
            comprehensive mock tests. Perfect for students, educators, and
            professionals preparing for exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GetStarted />
            <Link href="/about">
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-zinc-50 text-gray-900 border border-gray-300 hover:bg-gray-100"
                >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and intelligent PDF to mock test conversion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Upload PDF</CardTitle>
                <CardDescription>
                  Simply drag and drop your PDF documents or click to upload
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>AI Processing</CardTitle>
                <CardDescription>
                  Our AI analyzes your content and generates relevant questions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Get Mock Test</CardTitle>
                <CardDescription>
                  Download or take your personalized mock test online
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose ShikshaPrep?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Smart Question Generation
                    </h3>
                    <p className="text-gray-600">
                      AI creates diverse question types from your content
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Multiple Formats
                    </h3>
                    <p className="text-gray-600">
                      MCQs, True/False, Short answers, and more
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Instant Results
                    </h3>
                    <p className="text-gray-600">
                      Get your mock tests ready in minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Progress Tracking
                    </h3>
                    <p className="text-gray-600">
                      Monitor your performance and improvement
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://eklavvya.com/Content/wp-content/uploads/2025/03/Mock-Test.webp"
                alt="ShikshaPrep Dashboard"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Study Materials?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and educators who are already using
            ShikshaPrep
          </p>
          <StartTestButton />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Upload className="h-8 w-8 text-blue-400" />
            <span className="font-bold text-xl">ShikshaPrep</span>
          </div>
          <p className="text-gray-400 mb-4">
            Transforming education through intelligent mock test generation
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
